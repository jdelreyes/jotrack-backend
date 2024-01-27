import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enum';
import { ROLES_KEY } from '../decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prismaService: PrismaService,
  ) {}

  public async canActivate(
    executionContext: ExecutionContext,
  ): Promise<boolean> {
    const requiredRoles: Role[] = this.reflector.getAllAndOverride<Role[]>(
      ROLES_KEY,
      [executionContext.getHandler(), executionContext.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }

    const request = executionContext.switchToHttp().getRequest();
    const requestUserRole = request['user']?.role;

    const userRole: string = await this.verifyUserRole(request);
    if (!userRole && userRole !== requestUserRole)
      throw new UnauthorizedException();
    return requiredRoles.every((role: Role) => requestUserRole?.includes(role));
  }

  private async verifyUserRole(request: any): Promise<string> {
    try {
      const user: User = await this.prismaService.user.findUnique({
        where: { id: request['user'].sub },
      });

      return user.role;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException();
    }
  }
}
