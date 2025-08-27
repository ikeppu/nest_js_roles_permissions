// src/roles/role.codes.ts
export const RoleCode = {
  Admin: 'Admin',
  Manager: 'Manager',
  Support: 'Support',
} as const;

export type RoleCode = (typeof RoleCode)[keyof typeof RoleCode];
