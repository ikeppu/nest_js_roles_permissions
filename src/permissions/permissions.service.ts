import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionsRepo: Repository<Permission>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const entities = this.permissionsRepo.create(
      createPermissionDto.permissions,
    );
    const response = await this.permissionsRepo.save(entities);

    return response;
  }

  findAll() {
    return this.permissionsRepo.find();
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
