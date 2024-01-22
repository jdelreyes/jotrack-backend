import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from '../enum';
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
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [executionContext.getHandler(), executionContext.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }

    const request = executionContext.switchToHttp().getRequest();
    const requestUserRole = request['user']?.role;
    // todo: debug delete later

    const userRole = await this.verifyUserRole(request);

    if (!userRole && userRole !== requestUserRole)
      throw new UnauthorizedException();
    return requiredRoles.every((role) => requestUserRole?.includes(role));
  }

  private async verifyUserRole(request: any): Promise<string> {
    const user = await this.prismaService.user.findUnique({
      where: { id: request['user'].sub },
    });

    return user.role;
  }
}
