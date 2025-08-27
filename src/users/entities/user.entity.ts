import { BaseEntity } from 'src/common/entities/base.entity';
import { Permission } from 'src/permissions/entities/permission.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Column, ManyToMany, JoinTable, Entity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  accessTokenHash?: string;

  @ManyToMany(() => Role, { eager: true })
  @JoinTable({
    name: 'user_role',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'role_id' },
  })
  roles: Role[];

  @ManyToMany(() => Permission, { eager: true })
  @JoinTable({
    name: 'user_permission',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'permission_id' },
  })
  directPermissions: Permission[];
}
