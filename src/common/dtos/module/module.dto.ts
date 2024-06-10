export interface ModuleDto {
  _id: string;
  name: string;
  code: string;
  description: string;
  order: number;
  parent: string;
  path: string;
  permissions: string[];
  createdAt: string;
  isActive: boolean;
  isDeleted: boolean;
}
