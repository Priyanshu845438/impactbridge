import type { UserRole } from '../../enums/user-role.enum';
/**
 * Payload expected when registering a new user.
 */
export interface RegisterRequestDto {
    name: string;
    email: string;
    password: string;
    role: UserRole;
}
