import { SetMetadata } from '@nestjs/common';

export const PERMS_KEY = 'required_permissions';
export type PermMode = 'all' | 'any';

// Использование: @RequirePermissions('all', 'users.read', 'users.export')
export const RequirePermissions = (mode: PermMode, ...perms: string[]) =>
  SetMetadata(PERMS_KEY, { mode, perms });

// Шорткаты
export const RequireAll = (...perms: string[]) =>
  RequirePermissions('all', ...perms);
export const RequireAny = (...perms: string[]) =>
  RequirePermissions('any', ...perms);
