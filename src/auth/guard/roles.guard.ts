import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from '../enum';
import { ROLES_KEY } from '../decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(executionContext: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [executionContext.getHandler(), executionContext.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }

    const request = executionContext.switchToHttp().getRequest();
    const userRoles = request['user']?.role;

    return requiredRoles.every((role) => userRoles?.includes(role));
  }
}
