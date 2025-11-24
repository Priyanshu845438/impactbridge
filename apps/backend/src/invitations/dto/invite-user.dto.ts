import { IsEmail, IsEnum, IsString } from 'class-validator';
import { UserRole } from '../../user/user-role.enum';

export class InviteUserDto {
  @IsEmail()
  @IsString()
  email!: string;

  @IsEnum(UserRole)
  role!: UserRole;
}
