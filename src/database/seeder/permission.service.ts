import { Injectable } from '@nestjs/common';
import { PermissionCode } from 'src/permissions/constants/permission.codes';
import { Permission } from 'src/permissions/entities/permission.entity';
import { RoleCode } from 'src/roles/constants/role.codes';
import { Role } from 'src/roles/entities/role.entity';
import { DataSource, In } from 'typeorm';

@Injectable()
export class SeedRolesAndPermissions {
  constructor(private dataSource: DataSource) {}

  async seedRolesAndPermissions() {
    const roleRepo = this.dataSource.getRepository(Role);
    const permRepo = this.dataSource.getRepository(Permission);

    const permData = [
      { code: PermissionCode.UserCanCreate, title: 'Создание пользователя' },
      { code: PermissionCode.UserCanRead, title: 'Просмотр пользователя' },
      { code: PermissionCode.UserCanDelete, title: 'Удаление пользователя' },
      { code: PermissionCode.OrderCanCreate, title: 'Создание заказа' },
      { code: PermissionCode.OrderCanRead, title: 'Просмотр заказа' },
    ];

    await permRepo.upsert(permData, ['code']);

    const roleData = [
      { name: RoleCode.Admin, title: 'Администратор' },
      { name: RoleCode.Manager, title: 'Менеджер' },
    ];
    await roleRepo.upsert(roleData, ['name']);

    const adminRole = await roleRepo.findOne({
      where: { name: RoleCode.Admin },
      relations: ['permissions'],
    });
    const managerRole = await roleRepo.findOne({
      where: { name: RoleCode.Manager },
      relations: ['permissions'],
    });

    const allPerms = await permRepo.find({
      where: { code: In(Object.values(PermissionCode)) },
    });
    const managerPerms = await permRepo.find({
      where: {
        code: In([PermissionCode.UserCanRead, PermissionCode.OrderCanRead]),
      },
    });

    if (adminRole) {
      adminRole.permissions = allPerms; // Админ получает все
      await roleRepo.save(adminRole);
    }

    if (managerRole) {
      managerRole.permissions = managerPerms;
      await roleRepo.save(managerRole);
    }

    console.log('Roles and permissions seeded successfully');
  }
}
