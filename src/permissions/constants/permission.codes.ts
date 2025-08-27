export const PermissionCode = {
  UserCanCreate: 'User can create',
  UserCanRead: 'User can read',
  UserCanDelete: 'User can delete',

  OrderCanCreate: 'Order can create',
  OrderCanRead: 'Order can read',
  OrderCanDelete: 'Order can delete',
} as const;

export type PermissionCode =
  (typeof PermissionCode)[keyof typeof PermissionCode];
