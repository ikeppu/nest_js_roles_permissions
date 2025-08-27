// src/auth/access.guard.ts
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermMode, PERMS_KEY } from '../decorators/access.decorators';

// wildcard-поддержка с пробелами:
// '*' — супер-права; '<prefix> *' — группа (например, 'User *' покрывает все User ...)
function hasPerm(have: Set<string>, need: string) {
  if (have.has('*') || have.has(need)) return true;

  // Пример группового правила: 'User *' покроет 'User can create'
  // Берём первое слово как префикс:
  const firstSpace = need.indexOf(' ');
  if (firstSpace > 0) {
    const group = need.slice(0, firstSpace) + ' *'; // e.g. 'User *'
    if (have.has(group)) return true;
  }
  return false;
}

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const meta =
      this.reflector.get<{ mode: PermMode; codes: string[] }>(
        PERMS_KEY,
        ctx.getHandler(),
      ) ?? this.reflector.get(PERMS_KEY, ctx.getClass());
    if (!meta?.codes?.length) return true;

    const userPerms: string[] =
      ctx.switchToHttp().getRequest().user?.permissions ?? [];
    const have = new Set(userPerms);

    const ok =
      meta.mode === 'any'
        ? meta.codes.some((c) => hasPerm(have, c))
        : meta.codes.every((c) => hasPerm(have, c));

    if (!ok) throw new ForbiddenException('Недостаточно пермиссий');
    return true;
  }
}
