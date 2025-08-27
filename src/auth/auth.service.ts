import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { hashToken } from './utils/token.utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
  ) {}

  async validateUser(email: string): Promise<User> {
    const user = await this.usersRepo.findOne({ where: { email } });

    if (!user) throw new UnauthorizedException();

    return user;
  }

  async generateToken(user: User): Promise<{ accessToken: string }> {
    const payload = { sub: user.id, email: user.email };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET!,
    });

    return { accessToken };
  }

  async login(email: string): Promise<{ accessToken: string }> {
    const user = await this.validateUser(email);

    const token = await this.generateToken(user);

    await this.usersRepo.update(user.id, {
      accessTokenHash: hashToken(token.accessToken),
    });

    return token;
  }

  async register(email: string): Promise<{ accessToken: string }> {
    const exists = await this.usersRepo.findOne({ where: { email } });
    if (exists) throw new ConflictException('Email already exists');

    const user = this.usersRepo.create({ email });
    await this.usersRepo.save(user);

    const token = await this.generateToken(user);

    await this.usersRepo.update(user.id, {
      accessTokenHash: hashToken(token.accessToken),
    });

    return { ...token };
  }
}
