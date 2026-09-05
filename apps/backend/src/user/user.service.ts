import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ActivityLogService } from '../activity/activity-log.service';
import { Prisma, User, Role, NGORegistrationType } from 'prisma/generated';
import { sanitizeEntity, sanitizeEntities } from '../utils/sanitize.util';
import { ListQueryOptions, resolvePagination } from '../utils/pagination.util';
import {
  buildFindManyArgs,
  mergeWhere,
  buildCursorMeta,
} from '../utils/query.util';
import { comparePassword, hashPassword } from '../auth/utils/password.util';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly activityLog: ActivityLogService,
  ) {}

  async create(dto: CreateUserDto) {
    const { role, password, ...rest } = dto;
    const hashed = await hashPassword(password);

    const data = {
      ...rest,
      password: hashed,
      role: (role as Role) ?? Role.DONOR,
    };

    const user = await this.prisma.user.create({ data });
    return sanitizeEntity(user);
  }

  async findById(id: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.prisma.user.findUnique({
      where: { id, deletedAt: null },
    });
    return sanitizeEntity(user);
  }

  async findMany(
    options?: ListQueryOptions<Prisma.UserWhereInput>,
  ): Promise<Array<Omit<User, 'password'>>> {
    const args = buildFindManyArgs<'User', Prisma.UserWhereInput>(options);
    const users = await this.prisma.user.findMany({
      ...args,
      where: { ...args.where, deletedAt: null },
    });
    return sanitizeEntities(users);
  }

  async update(
    id: string,
    dto: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { address, password, ...userUpdates } = dto;

    const data: Prisma.UserUpdateInput = { ...userUpdates };
    if (password) {
      data.password = await hashPassword(password);
    }

    let updatedUser: User;
    try {
      updatedUser = await this.prisma.user.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException('Email already in use');
      }
      throw error;
    }

    if (address) {
      await this.prisma.nGOProfile.upsert({
        where: { userId: id },
        update: { missionStatement: address },
        create: {
          userId: id,
          registrationType: 'OTHER',
          registrationNumber: '',
          founderNames: '',
          yearEstablished: 0,
          missionStatement: address,
        },
      });
    }

    await this.activityLog.log(id, 'PROFILE_UPDATE', { updatedFields: dto });
    return sanitizeEntity(updatedUser)!;
  }

  async remove(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
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
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashed },
    });

    await this.activityLog.log(userId, 'PASSWORD_CHANGE', {});
  }

  // Profile-specific methods from legacy UsersService
  async getNGOById(id: string) {
    const user = await this.prisma.user.findFirst({
      where: { id, role: Role.NGO, deletedAt: null },
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
      where: { id, role: Role.COMPANY, deletedAt: null },
    });
    return sanitizeEntity(user);
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
      return {
        ...rest,
        user: sanitizeEntity(user),
      };
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
      return {
        ...rest,
        user: sanitizeEntity(user),
      };
    });
  }

  async updateSpent(companyId: string, amount: number) {
    const company = await this.prisma.companyProfile.findUnique({
      where: { id: companyId },
    });
    if (!company) {
      throw new NotFoundException('Company profile not found');
    }

    return this.prisma.companyProfile.update({
      where: { id: companyId },
      data: {
        csrSpent: (company.csrSpent || 0) + amount,
      },
    });
  }
}
