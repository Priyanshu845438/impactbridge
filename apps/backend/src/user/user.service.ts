import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ActivityLogService } from '../activity/activity-log.service';
import { Prisma, User } from 'prisma/generated';
import { sanitizeEntity } from '../utils/sanitize.util';
import { ListQueryOptions } from '../utils/pagination.util';
import { buildFindManyArgs } from '../utils/query.util';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly activityLog: ActivityLogService,
  ) {}

  async findById(id: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: undefined,
    });
    return sanitizeEntity(user);
  }

  async findMany(
    options?: ListQueryOptions<Prisma.UserWhereInput>,
  ): Promise<Array<Omit<User, 'password'>>> {
    const args = buildFindManyArgs<'User', Prisma.UserWhereInput>(options);
    const users = await this.prisma.user.findMany(args);
    return users
      .map((user) => sanitizeEntity(user))
      .filter((user): user is Omit<User, 'password'> => user !== null);
  }

  async update(
    id: string,
    dto: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { address, ...userUpdates } = dto;

    let updatedUser: User;
    try {
      updatedUser = await this.prisma.user.update({
        where: { id },
        data: userUpdates,
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
}
