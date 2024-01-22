import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { UserDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  public async retrieveUsers(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  public async createUser(userDto: UserDto): Promise<User> {
    try {
      const hash: string = await argon.hash(userDto.password);

      delete userDto.password;

      const user: User = await this.prismaService.user.create({
        data: {
          ...userDto,
          hash,
        },
      });

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        if (error.code === 'P2002')
          // code for field duplicate
          throw new ForbiddenException('credentials are taken');
      throw new BadRequestException();
    }
  }

  public async updateUser(userId: number, userDto: UserDto): Promise<User> {
    try {
      const hash = await argon.hash(userDto.password);

      delete userDto.password;

      const user = this.prismaService.user.update({
        where: {
          id: userId,
        },
        data: { ...userDto, hash },
      });

      return user;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  public async removeUser(userId: number): Promise<void> {
    try {
      await this.prismaService.user.delete({
        where: {
          id: userId,
        },
      });
    } catch (error) {
      throw new NotFoundException('user does not exist');
    }
  }

  public async retrieveUser(userId: number): Promise<User> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
      });

      return user;
    } catch (error) {
      throw new NotFoundException('user does not exist');
    }
  }
}
