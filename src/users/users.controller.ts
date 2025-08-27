import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { RequireAll, RequireAny } from 'src/auth/decorators/access.decorators';
import { AccessGuard } from 'src/auth/guards/access.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { PermissionCode as PC } from 'src/permissions/constants/permission.codes';

@UseGuards(JwtAuthGuard, AccessGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @RequireAny(PC.UserCanRead)
  @Get()
  list() {
    return 'ok';
  }

  @RequireAny(PC.UserCanCreate)
  @Post()
  create() {
    return 'created';
  }

  @RequireAll('users.update')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
}
