import { Injectable } from '@nestjs/common';
import { Prisma, Role, NGORegistrationType } from 'prisma/generated';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { comparePassword, hashPassword } from '../auth/utils/password.util';
import { sanitizeEntity, sanitizeEntities } from '../utils/sanitize.util';
import {
  buildFindManyArgs,
  mergeWhere,
  buildCursorMeta,
} from '../utils/query.util';
import type { ListQueryOptions } from '../utils/pagination.util';
import { resolvePagination } from '../utils/pagination.util';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateUserDto) {
    const { role, ...rest } = dto;
    const data = {
      ...rest,
      role: (role as Role) ?? Role.DONOR,
    };

    return this.prisma.user.create({ data });
  }

  async findAll(limit = 25, offset = 0) {
    const users = await this.prisma.user.findMany({
      where: { deletedAt: null },
      skip: offset,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
    return sanitizeEntities(users);
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateUserDto) {
    const { role, ...rest } = dto;
    const data = {
      ...rest,
      ...(role !== undefined ? { role: role } : {}),
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

    return sanitizeEntity(user);
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
      user: user ? sanitizeEntity(user) : null,
    };
  }

  async getCompanyById(id: string) {
    const user = await this.prisma.user.findFirst({
      where: { id, role: Role.COMPANY },
    });

    return sanitizeEntity(user);
  }

  async getNGOsWithCampaigns(
    options?: ListQueryOptions<Prisma.UserWhereInput>,
  ) {
    const pagination = resolvePagination(options);
    const args = buildFindManyArgs<'User', Prisma.UserWhereInput>({
      ...options,
      limit: pagination.meta.limit,
      offset: pagination.meta.offset,
      cursor: pagination.meta.cursorValue,
      cursorField: pagination.meta.cursorField,
      where: mergeWhere(options?.where, {
        role: Role.NGO,
      }) as Prisma.UserWhereInput,
    });

    const ngos = await this.prisma.user.findMany({
      ...args,
      include: { campaigns: true } as any,
      orderBy: options?.orderBy ?? { createdAt: 'desc' },
    });

    const cursorMeta = buildCursorMeta(pagination, ngos);

    return {
      data: sanitizeEntities(ngos),
      meta: {
        ...pagination.meta,
        ...cursorMeta,
      },
    };
  }

  async getCompaniesWithDonations(
    options?: ListQueryOptions<Prisma.UserWhereInput>,
  ) {
    const args = buildFindManyArgs<'User', Prisma.UserWhereInput>({
      ...options,
      where: mergeWhere(options?.where, {
        role: Role.COMPANY,
      }) as Prisma.UserWhereInput,
    });

    const companies = await this.prisma.user.findMany({
      ...args,
      include: {
        donations: {
          include: {
            campaign: true,
          },
        },
      } as any,
    });

    return sanitizeEntities(companies);
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

  async getAllNGOProfiles(
    options?: ListQueryOptions<Prisma.NGOProfileWhereInput>,
  ) {
    const args = buildFindManyArgs<'NGOProfile', Prisma.NGOProfileWhereInput>(
      options,
    );

    const ngos = await this.prisma.nGOProfile.findMany({
      ...args,
      include: {
        user: true,
        bankDetails: true,
        documents: true,
        addresses: true,
      },
    });

    return ngos.map((ngo) => {
      const { user, ...rest } = ngo;
      return sanitizeEntity({
        ...rest,
        user: sanitizeEntity(user),
      })!;
    });
  }

  async getAllCompanyProfiles(
    options?: ListQueryOptions<Prisma.CompanyProfileWhereInput>,
  ) {
    const args = buildFindManyArgs<
      'CompanyProfile',
      Prisma.CompanyProfileWhereInput
    >(options);

    const companies = await this.prisma.companyProfile.findMany({
      ...args,
      include: {
        user: true,
        bankDetails: true,
        documents: true,
        addresses: true,
      },
    });

    return companies.map((company) => {
      const { user, ...rest } = company;
      return sanitizeEntity({
        ...rest,
        user: sanitizeEntity(user),
      })!;
    });
  }

  async getAllDonorProfiles(
    options?: ListQueryOptions<Prisma.DonorProfileWhereInput>,
  ) {
    const args = buildFindManyArgs<
      'DonorProfile',
      Prisma.DonorProfileWhereInput
    >(options);

    const donors = await this.prisma.donorProfile.findMany({
      ...args,
      include: {
        user: true,
        addresses: true,
      },
    });

    return donors.map((donor) => {
      const { user, ...rest } = donor;
      return sanitizeEntity({
        ...rest,
        user: sanitizeEntity(user),
      })!;
    });
  }
}
