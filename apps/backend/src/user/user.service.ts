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

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly activityLog: ActivityLogService,
  ) {}

  async findById(id: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return sanitizeEntity(user);
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
