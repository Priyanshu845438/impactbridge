import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ActivityLogService } from '../activity/activity-log.service';
import { Prisma } from 'prisma/generated';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly activityLog: ActivityLogService,
  ) {}

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      return null;
    }
    const { password, ...rest } = user;
    return rest;
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { address, ...userUpdates } = dto;

    let updatedUser;
    try {
      updatedUser = await this.prisma.user.update({
        where: { id },
        data: userUpdates,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
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

    const { password, ...safe } = updatedUser;
    return safe;
  }
}
