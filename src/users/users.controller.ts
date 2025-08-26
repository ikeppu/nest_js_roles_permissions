import { Controller, Get, Post, UseGuards } from '@nestjs/common';

import { RequireAll, RequireAny } from 'src/auth/decorators/access.decorators';
import { AccessGuard } from 'src/auth/guards/access.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard, AccessGuard)
@Controller('users')
export class UsersController {
  @RequireAll('users.read')
  @Get()
  list() {
    return 'ok';
  }

  @RequireAny('users.create', 'users.invite')
  @Post()
  create() {
    return 'created';
  }
}
