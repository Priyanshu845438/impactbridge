import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { UserRole } from '../../user/user-role.enum';

export class RegisterDto {
  @IsString()
  name!: string;

  @IsEmail()
  @IsString()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsEnum(UserRole)
  role!: UserRole;
}
