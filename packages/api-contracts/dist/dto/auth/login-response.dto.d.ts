import type { UserRole } from '../../enums/user-role.enum';
/**
 * Shape of the login response shared between backend and frontend.
 */
export interface LoginResponseDto {
    accessToken: string;
    user: {
        id: string;
        name: string;
        email: string;
        role: UserRole;
    };
}
