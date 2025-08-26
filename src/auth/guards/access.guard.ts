import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermMode, PERMS_KEY } from '../decorators/access.decorators';

function hasPerm(have: Set<string>, needed: string) {
  // поддержка иерархии: '*' или 'users.*' покрывает 'users.read'
  if (have.has('*') || have.has(needed)) return true;
  const dot = needed.indexOf('.');

  if (dot > 0) {
    const prefix = needed.slice(0, dot) + '.*';
    if (have.has(prefix)) return true;
  }

  return false;
}

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const meta =
      this.reflector.get<{ mode: PermMode; perms: string[] }>(
        PERMS_KEY,
        ctx.getHandler(),
      ) ?? this.reflector.get(PERMS_KEY, ctx.getClass());

    if (!meta?.perms?.length) return true; // ничего не требуем

    const req = ctx.switchToHttp().getRequest();
    const userPerms: string[] = req.user?.permissions ?? [];
    const have = new Set(userPerms);

    const ok =
      meta.mode === 'any'
        ? meta.perms.some((p) => hasPerm(have, p))
        : meta.perms.every((p) => hasPerm(have, p));

    if (!ok) throw new ForbiddenException('Not enough permissions');
    return true;
  }
}
