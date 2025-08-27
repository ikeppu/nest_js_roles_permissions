import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDbConfig } from 'src/config/db.config';
import { DataSource } from 'typeorm';
import { SeedRolesAndPermissions } from './seeder/permission.service';
@Module({
  imports: [TypeOrmModule.forRoot(getDbConfig())],
  providers: [SeedRolesAndPermissions],
})
export class DatabaseModule implements OnModuleInit {
  constructor(
    private readonly seedRolesAndPermissions: SeedRolesAndPermissions,
  ) {}

  async onModuleInit() {
    await this.seedRolesAndPermissions.seedRolesAndPermissions();
  }
}
