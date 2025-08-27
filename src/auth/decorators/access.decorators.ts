import { SetMetadata } from '@nestjs/common';
export const PERMS_KEY = 'required_permissions';
export type PermMode = 'all' | 'any';
export const RequirePermissions = (mode: PermMode, ...codes: string[]) =>
  SetMetadata(PERMS_KEY, { mode, codes });

export const RequireAll = (...codes: string[]) =>
  RequirePermissions('all', ...codes);
export const RequireAny = (...codes: string[]) =>
  RequirePermissions('any', ...codes);
