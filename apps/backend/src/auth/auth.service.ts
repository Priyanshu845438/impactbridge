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
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });

    if (!user || !(await comparePassword(dto.password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    const token = signToken({ sub: user.id, role: user.role });
    const { password, ...safeUser } = user;
    void password;

    return {
      user: safeUser,
      accessToken: token,
    };
  }

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({ where: { email: dto.email } });

    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const hashedPassword = await hashPassword(dto.password);

    const role = dto.role ?? UserRole.DONOR;

    const createdUser = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        role,
        ngoProfile:
          role === UserRole.NGO
            ? {
                create: {
                  registrationType: 'OTHER',
                  registrationNumber: '',
                  founderNames: '',
                  yearEstablished: 0,
                  missionStatement: '',
                },
              }
            : undefined,
        companyProfile:
          role === UserRole.COMPANY
            ? {
                create: {
                  cin: '',
                  industry: '',
                },
              }
            : undefined,
        donorProfile:
          role === UserRole.DONOR
            ? {
                create: {},
              }
            : undefined,
      },
    });

    const { password: _password, ...safeUser } = createdUser;
    void _password;

    return safeUser;
  }
}
