import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enum';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prismaService: PrismaService,
  ) {}

  public async canActivate(
    executionContext: ExecutionContext,
  ): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      executionContext.getHandler(),
      executionContext.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const request = executionContext.switchToHttp().getRequest();
    const requestUserRole = request['user']?.role;

    const userRole = await this.verifyUserRole(request);
    if (!userRole && userRole !== requestUserRole)
      throw new UnauthorizedException();
    return requiredRoles.every((role) => requestUserRole?.includes(role));
  }

  private async verifyUserRole(request: any): Promise<string> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: request['user'].sub },
      });

      return user.role;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
