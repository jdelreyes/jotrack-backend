import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LogInDto, SignUpDto } from './dto';
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
    authLogInDto: LogInDto,
  ): Promise<{ access_token: string }> {
    const user: User = await this.prismaService.user.findUnique({
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

    const jwtPayload: { sub: number; role: string } = {
      sub: user.id,
      role: user.role,
    };
    const token: string = await this.jwtService.signAsync(jwtPayload);

    return { access_token: token };
  }

  public async signup(authSignUpDto: SignUpDto): Promise<User> {
    try {
      const hash: string = await argon.hash(authSignUpDto.password);

      delete authSignUpDto.password;

      const user: User = await this.prismaService.user.create({
        data: {
          ...this.mapToUserRequestDto(authSignUpDto),
          hash,
          address: {
            create: {
              ...this.mapToAddressRequestDto(authSignUpDto),
            },
          },
        },
      });

      return user;
    } catch (error) {
      console.error(error);
      if (error instanceof PrismaClientKnownRequestError)
        if (error.code === 'P2002')
          throw new ForbiddenException('credentials are taken');
      throw new BadRequestException();
    }
  }

  private mapToUserRequestDto(signUpDto: SignUpDto): {
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    phoneNumber: number;
  } {
    return {
      email: signUpDto.email,
      role: signUpDto.role,
      firstName: signUpDto.firstName,
      lastName: signUpDto.lastName,
      phoneNumber: signUpDto.phoneNumber,
    };
  }

  private mapToAddressRequestDto(signUpDto: SignUpDto): {
    postalCode: string;
    street: string;
    city: string;
    province: string;
    country: string;
  } {
    return {
      postalCode: signUpDto.postalCode,
      street: signUpDto.street,
      city: signUpDto.city,
      province: signUpDto.province,
      country: signUpDto.country,
    };
  }
}
