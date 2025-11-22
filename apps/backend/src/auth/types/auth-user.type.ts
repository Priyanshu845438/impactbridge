import { UserRole } from '../../user/user-role.enum';

export interface AuthUser {
  sub: string;
  role: UserRole;
}
