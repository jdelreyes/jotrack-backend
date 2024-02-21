import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enum';
import { ROLES_KEY } from '../decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  public async canActivate(
    executionContext: ExecutionContext,
  ): Promise<boolean> {
    const requiredRoles: Role[] = this.reflector.getAllAndOverride<Role[]>(
      ROLES_KEY,
      [executionContext.getHandler(), executionContext.getClass()],
    );
    if (!requiredRoles) return true;

    const request: any = executionContext.switchToHttp().getRequest();
    const requestUserRole: string = request['user']?.role;

    if (!requestUserRole) throw new UnauthorizedException();
    return requiredRoles.every((role: Role) => requestUserRole.includes(role));
  }
}
