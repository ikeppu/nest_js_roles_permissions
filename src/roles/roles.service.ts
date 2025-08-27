import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Repository } from 'typeorm/repository/Repository';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Permission } from 'src/permissions/entities/permission.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepo: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionsRepo: Repository<Permission>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const permissions = await Promise.all(
      createRoleDto.permissions.map((permissionCode) =>
        this.permissionsRepo.findOne({ where: { code: permissionCode } }),
      ),
    );
    const validPermissions = permissions.filter(
      (p): p is Permission => p !== null,
    );

    const role = this.rolesRepo.create({
      name: createRoleDto.name,
      permissions: validPermissions,
    });

    return this.rolesRepo.save(role);
  }

  findAll() {
    return `This action returns all roles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
