import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS: RegExp[] = [
  /^\/login(\/.*)?$/,
  /^\/register(\/.*)?$/,
  /^\/forgot-password(\/.*)?$/,
  /^\/reset-password(\/.*)?$/,
  /^\/api\/mock(\/.*)?$/,
];

const DASHBOARD_ROLE_PREFIX: Record<string, string> = {
  SUPER_ADMIN: "/dashboard/admin",
  NGO: "/dashboard/ngo",
  COMPANY: "/dashboard/company",
  DONOR: "/dashboard/donor",
};

const DASHBOARD_ACCESS: Record<string, RegExp[]> = {
  SUPER_ADMIN: [/^\/dashboard(\/.*)?$/],
  NGO: [/^\/dashboard\/ngo(\/.*)?$/],
  COMPANY: [/^\/dashboard\/company(\/.*)?$/],
  DONOR: [/^\/dashboard\/donor(\/.*)?$/],
};

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.some((pattern) => pattern.test(pathname));
}

function matchRoleAccess(pathname: string, role: string | undefined) {
  if (!role) {
    return false;
  }

  const patterns = DASHBOARD_ACCESS[role];
  if (!patterns) {
    return false;
  }

  return patterns.some((pattern) => pattern.test(pathname));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname) || pathname === "/" || pathname.startsWith("/_next") || pathname.startsWith("/static")) {
    return NextResponse.next();
  }

  const session = request.cookies.get("impactbridge-session")?.value;
  const role = request.cookies.get("impactbridge-role")?.value;

  if (!session || !role) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (!matchRoleAccess(pathname, role)) {
    const safeRedirect = DASHBOARD_ROLE_PREFIX[role] ?? "/dashboard";
    const redirectUrl = new URL(safeRedirect, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|static|favicon\\.ico).*)",
  ],
};
