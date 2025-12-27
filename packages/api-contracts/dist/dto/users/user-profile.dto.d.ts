import type { UserRole } from '../../enums/user-role.enum';
export interface UserProfileDto {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
}
