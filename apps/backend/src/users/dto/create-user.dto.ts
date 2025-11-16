import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { IsEnum } from 'class-validator';
import { Role } from 'prisma/generated';

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(2)
  name!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
