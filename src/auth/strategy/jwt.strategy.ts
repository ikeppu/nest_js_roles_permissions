import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { hashToken } from '../utils/token.utils';
import { Request } from 'express';

type JwtPayload = { sub: string; email?: string };

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET!,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const rawToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    if (!rawToken) throw new UnauthorizedException('Missing token');

    const tokenHash = hashToken(rawToken);

    const user = await this.users.findOne({
      where: { id: payload.sub, accessTokenHash: tokenHash },
      relations: ['roles', 'roles.permissions', 'directPermissions'],
    });

    if (!user) throw new UnauthorizedException();

    const set = new Set<string>();
    user.roles?.forEach((r) => r.permissions?.forEach((p) => set.add(p.code)));
    user.directPermissions?.forEach((p) => set.add(p.code));

    return {
      id: user.id,
      email: user.email,
      permissions: Array.from(set),
    };
  }
}
