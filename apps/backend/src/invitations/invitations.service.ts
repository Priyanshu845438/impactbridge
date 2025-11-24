import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { InviteUserDto } from './dto/invite-user.dto';
import { hashPassword } from '../auth/utils/password.util';
import { UsersService } from '../users/users.service';
import { UserRole } from '../user/user-role.enum';

@Injectable()
export class InvitationsService {
  private readonly inviteExpiryHours = 72;

  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async createInvite(dto: InviteUserDto, creatorId: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists for this email');
    }

    const token = randomUUID();
    const expiresAt = new Date(
      Date.now() + this.inviteExpiryHours * 60 * 60 * 1000,
    );

    const invitation = await this.prisma.invitation.create({
      data: {
        email: dto.email,
        role: dto.role,
        token,
        expiresAt,
        createdBy: creatorId,
      },
    });

    return {
      invitationId: invitation.id,
      inviteLink: `${process.env.APP_URL ?? 'http://localhost:3000'}/auth/accept-invite?token=${token}`,
      expiresAt,
    };
  }

  async acceptInvite(token: string, password: string) {
    const invitation = await this.prisma.invitation.findUnique({
      where: { token },
    });

    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }

    if (invitation.expiresAt < new Date()) {
      await this.prisma.invitation.delete({ where: { id: invitation.id } });
      throw new BadRequestException('Invitation token expired');
    }

    const hashedPassword = await hashPassword(password);

    const createdUser = await this.prisma.$transaction(async (trx) => {
      const user = await trx.user.create({
        data: {
          email: invitation.email,
          name: invitation.email.split('@')[0],
          password: hashedPassword,
          role: invitation.role,
        },
      });

      await trx.invitation.delete({ where: { id: invitation.id } });

      return user;
    });

    const mappedRole = UserRole[invitation.role as keyof typeof UserRole];

    await this.ensureProfileForRole(createdUser.id, mappedRole);

    return {
      id: createdUser.id,
      email: createdUser.email,
      role: createdUser.role,
    };
  }

  private async ensureProfileForRole(userId: string, role: UserRole) {
    if (role === UserRole.NGO) {
      await this.usersService.createNGOProfile(userId);
    }

    if (role === UserRole.COMPANY) {
      await this.usersService.createCompanyProfile(userId);
    }

    if (role === UserRole.DONOR) {
      await this.usersService.createDonorProfile(userId);
    }
  }
}
