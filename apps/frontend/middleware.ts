import { NextRequest, NextResponse } from "next/server";
import {
  DASHBOARD_ROLE_PREFIX,
  getRoleHome,
  isPublicPath,
  isUserRole,
  matchRoleAccess,
  type UserRole,
} from "@/types/rbac";

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

  if (!matchRoleAccess(pathname, isUserRole(role) ? role : undefined)) {
    const safeRedirect = isUserRole(role)
      ? getRoleHome(role)
      : DASHBOARD_ROLE_PREFIX.SUPER_ADMIN;
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
