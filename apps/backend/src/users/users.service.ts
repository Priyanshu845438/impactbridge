import { Injectable } from '@nestjs/common';
import { Prisma, Role, NGORegistrationType } from 'prisma/generated';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { comparePassword, hashPassword } from '../auth/utils/password.util';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  private sanitize<T extends { password?: string }>(user: T | null) {
    if (!user) {
      return null;
    }
    const { password, ...rest } = user;
    return rest;
  }

  create(dto: CreateUserDto) {
    const { role, ...rest } = dto;
    const data = {
      ...rest,
      role: (role as Role) ?? Role.DONOR,
    };

    return this.prisma.user.create({ data });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateUserDto) {
    const { role, ...rest } = dto;
    const data = {
      ...rest,
      ...(role !== undefined ? { role: role as Role } : {}),
    };

    return this.prisma.user.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const matches = await comparePassword(dto.oldPassword, user.password);

    if (!matches) {
      throw new BadRequestException('Invalid existing password');
    }

    const hashed = await hashPassword(dto.newPassword);

    return this.prisma.user.update({
      where: { id: userId },
      data: { password: hashed },
    });
  }

  async getNGOById(id: string) {
    const user = await this.prisma.user.findFirst({
      where: { id, role: Role.NGO },
    });

    return this.sanitize(user);
  }

  async getNGOProfileByUserId(userId: string) {
    const profile = await this.prisma.nGOProfile.findUnique({
      where: { userId },
      include: { user: true },
    });

    if (!profile) return null;

    const { user, ...rest } = profile;
    return {
      ...rest,
      user: user ? this.sanitize(user) : null,
    };
  }

  async getCompanyById(id: string) {
    const user = await this.prisma.user.findFirst({
      where: { id, role: Role.COMPANY },
    });

    return this.sanitize(user);
  }

  async getNGOsWithCampaigns() {
    const ngos = await this.prisma.user.findMany({
      where: { role: Role.NGO },
      include: { campaigns: true },
    } as Prisma.UserFindManyArgs);

    return ngos.map((ngo) => this.sanitize(ngo));
  }

  async getCompaniesWithDonations() {
    const companies = await this.prisma.user.findMany({
      where: { role: Role.COMPANY },
      include: {
        donations: {
          include: {
            campaign: true,
          },
        },
      },
    } as Prisma.UserFindManyArgs);

    return companies.map((company) => this.sanitize(company));
  }

  async createNGOProfile(userId: string) {
    return this.prisma.nGOProfile.create({
      data: {
        userId,
        registrationType: NGORegistrationType.OTHER,
        registrationNumber: '',
        founderNames: '',
        yearEstablished: 0,
        missionStatement: '',
      },
    });
  }

  async createCompanyProfile(userId: string) {
    return this.prisma.companyProfile.create({
      data: {
        userId,
        cin: '',
        industry: '',
      },
    });
  }

  async createDonorProfile(userId: string) {
    return this.prisma.donorProfile.create({
      data: {
        userId,
      },
    });
  }

  async getAllNGOProfiles() {
    const ngos = await this.prisma.nGOProfile.findMany({
      include: {
        user: true,
        bankDetails: true,
        documents: true,
        addresses: true,
      },
    });

    return ngos.map((ngo) => {
      const { user, ...rest } = ngo;
      return {
        ...rest,
        user: user ? this.sanitize(user) : null,
      };
    });
  }

  async getAllCompanyProfiles() {
    const companies = await this.prisma.companyProfile.findMany({
      include: {
        user: true,
        bankDetails: true,
        documents: true,
        addresses: true,
      },
    });

    return companies.map((company) => {
      const { user, ...rest } = company;
      return {
        ...rest,
        user: user ? this.sanitize(user) : null,
      };
    });
  }

  async getAllDonorProfiles() {
    const donors = await this.prisma.donorProfile.findMany({
      include: {
        user: true,
        addresses: true,
      },
    });

    return donors.map((donor) => {
      const { user, ...rest } = donor;
      return {
        ...rest,
        user: user ? this.sanitize(user) : null,
      };
    });
  }
}
