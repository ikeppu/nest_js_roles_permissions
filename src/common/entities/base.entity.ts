import {
  BaseEntity as TypeOrmBaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
} from 'typeorm';

export abstract class BaseEntity extends TypeOrmBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index() // Index for creation date
  @CreateDateColumn()
  createdAt: Date;

  @Index() // Index for update date
  @UpdateDateColumn()
  updatedAt: Date;

  @Index() // Index for soft-delete date
  @DeleteDateColumn()
  deletedAt?: Date;
}
