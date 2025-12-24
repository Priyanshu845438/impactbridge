export type UserRole = 'SUPER_ADMIN' | 'NGO' | 'COMPANY' | 'DONOR';

export const USER_ROLES: readonly UserRole[] = [
  'SUPER_ADMIN',
  'NGO',
  'COMPANY',
  'DONOR',
] as const;

export function isUserRole(value: unknown): value is UserRole {
  return typeof value === 'string' && (USER_ROLES as readonly string[]).includes(value);
}

export function coerceUserRole(value: unknown): UserRole | undefined {
  return isUserRole(value) ? value : undefined;
}

export function resolveRoleRedirect(pathname: string, role: UserRole | undefined) {
  if (!role) {
    return null;
  }

  if (matchRoleAccess(pathname, role)) {
    return null;
  }

  return getRoleHome(role);
}

export type RoleAccessMap = Record<UserRole, RegExp[]>;

export const DASHBOARD_ROLE_PREFIX: Record<UserRole, string> = {
  SUPER_ADMIN: '/dashboard/admin',
  NGO: '/dashboard/ngo',
  COMPANY: '/dashboard/company',
  DONOR: '/dashboard/donor',
};

export const DASHBOARD_ACCESS: RoleAccessMap = {
  SUPER_ADMIN: [/^\/dashboard(\/.*)?$/],
  NGO: [/^\/dashboard\/ngo(\/.*)?$/],
  COMPANY: [/^\/dashboard\/company(\/.*)?$/],
  DONOR: [/^\/dashboard\/donor(\/.*)?$/],
};

export const PUBLIC_PATHS: RegExp[] = [
  /^\/login(\/.*)?$/,
  /^\/register(\/.*)?$/,
  /^\/forgot-password(\/.*)?$/,
  /^\/reset-password(\/.*)?$/,
  /^\/api\/mock(\/.*)?$/,
];

export function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.some((pattern) => pattern.test(pathname));
}

export function matchRoleAccess(pathname: string, role: UserRole | undefined) {
  if (!role) {
    return false;
  }

  const patterns = DASHBOARD_ACCESS[role];
  if (!patterns) {
    return false;
  }

  return patterns.some((pattern) => pattern.test(pathname));
}

export function getRoleHome(role: UserRole): string {
  return DASHBOARD_ROLE_PREFIX[role] ?? '/dashboard';
}
