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
import { OpenAIService } from 'src/openai/openai.service';
import OpenAI from 'openai';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly openAIService: OpenAIService,
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

    const jwtPayload: { sub: number; userName: string; role: string } = {
      sub: user.id,
      userName: user.userName,
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
          ...this.mapToUserObject(signUpRequestDto),
          hash,
          userName,
          address: {
            create: {
              ...this.mapToAddressObject(signUpRequestDto),
            },
          },
        },
      });

      // START
      // create a thread id for the user
      const thread: OpenAI.Beta.Threads.Thread =
        await this.openAIService.createThread();

      await this.prismaService.openAI.create({
        data: { userId: user.id, threadId: thread.id },
      });
      // END

      return user;
    } catch (error) {
      console.error(error);
      if (error instanceof PrismaClientKnownRequestError)
        if (error.code === 'P2002') throw new ForbiddenException();
      throw new BadRequestException();
    }
  }

  private mapToUserObject(signUpRequestDto: SignUpRequestDto): {
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

  private mapToAddressObject(signUpRequestDto: SignUpRequestDto): {
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
