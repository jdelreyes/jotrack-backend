import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {
  }

  async login(authDto: AuthDto) {
  }

  async signup(authDto: AuthDto) {
    const hash: string = await argon.hash(authDto.password);
    try {

      delete authDto.password;

      const user = await this.prismaService.user.create({
        data: {
          ...authDto,
          hash,
        },
      });

      delete user.hash;

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        if (error.code === 'P2002')
          // code for field duplicate
          throw new ForbiddenException('Credentials taken');
      throw Error;
    }
  }
}
