import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { In } from 'typeorm/find-options/operator/In';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/permissions/entities/permission.entity';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionsRepo: Repository<Permission>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['roles', 'directPermissions'],
    });
    if (!user) throw new NotFoundException('User not found');

    if (updateUserDto.roles) {
      const roles = await this.roleRepo.findBy({ id: In(updateUserDto.roles) });
      user.roles = roles;
    }

    if (updateUserDto.permissions) {
      const perms = await this.permissionsRepo.findBy({
        code: In(updateUserDto.permissions),
      });
      user.directPermissions = perms;
    }

    await this.userRepo.save(user);
    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
