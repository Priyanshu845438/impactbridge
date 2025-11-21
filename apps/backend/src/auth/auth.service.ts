import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { hashPassword, comparePassword } from './utils/password.util';
import { signToken } from './utils/jwt.util';
import { UserRole } from '../user/user-role.enum';
import { UsersService } from '../users/users.service';
import { ActivityLogService } from '../activity/activity-log.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly activityLog: ActivityLogService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const passwordMatches = await comparePassword(dto.password, user.password);

    if (!passwordMatches) {
      throw new BadRequestException('Invalid credentials');
    }

    const token = await signToken({ sub: user.id, role: user.role });

    const { password, ...userSafe } = user;

    await this.activityLog.log(user.id, 'LOGIN_SUCCESS', { email: user.email });

    return {
      user: userSafe,
      accessToken: token,
    };
  }

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const hashedPassword = await hashPassword(dto.password);

    const createdUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        password: hashedPassword,
        role: dto.role ?? UserRole.DONOR,
      },
    });

    const role = dto.role ?? UserRole.DONOR;

    if (role === UserRole.NGO) {
      await this.usersService.createNGOProfile(createdUser.id);
    }

    if (role === UserRole.COMPANY) {
      await this.usersService.createCompanyProfile(createdUser.id);
    }

    if (role === UserRole.DONOR) {
      await this.usersService.createDonorProfile(createdUser.id);
    }

    await this.activityLog.log(createdUser.id, 'REGISTRATION', { role });

    const { password, ...userWithoutPassword } = createdUser;
    return userWithoutPassword;
  }
}
