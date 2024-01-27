import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LogInRequestDto, SignUpRequestDto } from './dto';
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
    logInRequestDto: LogInRequestDto,
  ): Promise<{ access_token: string }> {
    const user: User = await this.prismaService.user.findUnique({
      where: {
        email: logInRequestDto.email,
      },
    });
    if (!user) throw new ForbiddenException();

    const passwordMatches: boolean = await argon.verify(
      user.hash,
      logInRequestDto.password,
    );

    if (!passwordMatches) throw new ForbiddenException();

    const jwtPayload: { sub: number; role: string } = {
      sub: user.id,
      role: user.role,
    };
    const token: string = await this.jwtService.signAsync(jwtPayload);

    return { access_token: token };
  }

  public async signup(signUpRequestDto: SignUpRequestDto): Promise<User> {
    try {
      const hash: string = await argon.hash(signUpRequestDto.password);
      const userName: string = signUpRequestDto.email.split('@')[0];

      delete signUpRequestDto.password;

      const user: User = await this.prismaService.user.create({
        data: {
          ...this.mapToUserRequestDto(signUpRequestDto),
          hash,
          userName,
          address: {
            create: {
              ...this.mapToAddressRequestDto(signUpRequestDto),
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

  private mapToUserRequestDto(signUpRequestDto: SignUpRequestDto): {
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    phoneNumber: number;
  } {
    return {
      email: signUpRequestDto.email,
      role: signUpRequestDto.role,
      firstName: signUpRequestDto.firstName,
      lastName: signUpRequestDto.lastName,
      phoneNumber: signUpRequestDto.phoneNumber,
    };
  }

  private mapToAddressRequestDto(signUpRequestDto: SignUpRequestDto): {
    postalCode: string;
    street: string;
    city: string;
    province: string;
    country: string;
  } {
    return {
      postalCode: signUpRequestDto.postalCode,
      street: signUpRequestDto.street,
      city: signUpRequestDto.city,
      province: signUpRequestDto.province,
      country: signUpRequestDto.country,
    };
  }
}
