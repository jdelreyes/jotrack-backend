import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { Role } from '../enum';

export const ROLES_KEY: string = 'roles';
export const Roles = (...roles: Role[]): CustomDecorator<string> =>
  SetMetadata(ROLES_KEY, roles);
