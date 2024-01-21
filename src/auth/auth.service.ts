import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthLogInDto } from './dto/login';
import { AuthSignUpDto } from './dto/signup';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  public async login(
    authLogInDto: AuthLogInDto,
  ): Promise<{ access_token: string; user: User }> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: authLogInDto.email,
      },
    });
    if (!user) throw new ForbiddenException('credentials are incorrect');

    const passwordMatches = await argon.verify(
      user.hash,
      authLogInDto.password,
    );

    if (!passwordMatches)
      throw new ForbiddenException('credentials are incorrect');

    const jwtPayload = {
      sub: user.id,
      fullName: `${user.firstName} ${user.lastName}`,
      role: user.role,
    };
    const token: string = await this.jwtService.signAsync(jwtPayload);

    return { access_token: token, user: { ...user } };
  }

  public async signup(authSignUpDto: AuthSignUpDto): Promise<User> {
    try {
      const hash: string = await argon.hash(authSignUpDto.password);

      delete authSignUpDto.password;

      const user = await this.prismaService.user.create({
        data: {
          ...authSignUpDto,
          hash,
        },
      });

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        if (error.code === 'P2002')
          // code for field duplicate
          throw new ForbiddenException('credentials are taken');
      throw Error;
    }
  }
}
