import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { hashPassword, comparePassword } from './utils/password.util';
import { signToken } from './utils/jwt.util';
import { UserRole } from '../user/user-role.enum';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

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

    const { password, ...userWithoutPassword } = createdUser;
    return userWithoutPassword;
  }
}
