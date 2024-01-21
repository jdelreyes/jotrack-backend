import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  public async retrieveUsers(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  // todo: read, update, delete methods
}
