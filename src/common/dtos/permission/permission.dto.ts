export interface PermissionDto {
  _id: string;
  name: string;
  description: string;
  module: string;
  createdAt: Date;
  isActive: boolean;
  isDeleted: boolean;
}
