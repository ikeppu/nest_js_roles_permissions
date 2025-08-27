import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDbConfig } from 'src/config/db.config';
@Module({
  imports: [TypeOrmModule.forRoot(getDbConfig())],
})
export class DatabaseModule {}
