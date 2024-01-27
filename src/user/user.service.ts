import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as argon from 'argon2';

import { PrismaService } from '../prisma/prisma.service';
import {
  ChangePasswordRequestDto,
  UpdateUserRequestDto,
  UserResponseDto,
  UserWithAddressDto,
} from './dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  public async retrieveUsers(): Promise<UserResponseDto[]> {
    return (
      await this.prismaService.user.findMany({ include: { address: true } })
    ).map((userWithAddressDto: UserWithAddressDto) =>
      this.mapToUserResponseDto(userWithAddressDto),
    );
  }

  public async updateProfile(
    userId: number,
    updateUserRequestDto: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    try {
      const userWithAddressDto: UserWithAddressDto =
        await this.prismaService.user.update({
          where: {
            id: userId,
          },
          data: {
            ...this.mapToUserRequestDto(updateUserRequestDto),
            address: {
              update: { ...this.mapToAddressRequestDto(updateUserRequestDto) },
            },
          },
          include: { address: true },
        });

      return this.mapToUserResponseDto(userWithAddressDto);
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
      throw new NotFoundException();
    }
  }

  public async retrieveUser(userId: number): Promise<UserResponseDto> {
    try {
      const userWithAddressDto: UserWithAddressDto =
        await this.prismaService.user.findUnique({
          where: { id: userId },
          include: { address: true },
        });

      return this.mapToUserResponseDto(userWithAddressDto);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  // todo: user in controller
  public async retrieveUserByUserName(
    userName: string,
  ): Promise<UserResponseDto[]> {
    try {
      const userWithAddressDtos: UserWithAddressDto[] =
        await this.prismaService.user.findMany({
          where: { userName: { startsWith: userName } },
          include: { address: true },
        });

      return userWithAddressDtos.map((userWithAddressDto: UserWithAddressDto) =>
        this.mapToUserResponseDto(userWithAddressDto),
      );
    } catch (error) {
      console.error();
      throw new BadRequestException();
    }
  }

  public async changePassword(
    userId: number,
    changePasswordRequestDto: ChangePasswordRequestDto,
  ): Promise<void> {
    try {
      const hash: string = await argon.hash(changePasswordRequestDto.password);

      await this.prismaService.user.update({
        where: { id: userId },
        data: { hash },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  private mapToUserResponseDto(
    userWithAddressDto: UserWithAddressDto,
  ): UserResponseDto {
    const userResponseDto: UserResponseDto = new UserResponseDto();

    userResponseDto.id = userWithAddressDto.id;
    userResponseDto.userName = userWithAddressDto.userName;
    userResponseDto.email = userWithAddressDto.email;
    userResponseDto.firstName = userWithAddressDto.firstName;
    userResponseDto.lastName = userWithAddressDto.lastName;
    userResponseDto.phoneNumber = userWithAddressDto.phoneNumber;

    userResponseDto.street = userWithAddressDto.address.street;
    userResponseDto.postalCode = userWithAddressDto.address.postalCode;
    userResponseDto.city = userWithAddressDto.address.city;
    userResponseDto.province = userWithAddressDto.address.province;
    userResponseDto.country = userWithAddressDto.address.country;

    return userResponseDto;
  }

  private mapToUserRequestDto(userRequestDto: UpdateUserRequestDto): {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: number;
  } {
    return {
      email: userRequestDto.email,
      firstName: userRequestDto.firstName,
      lastName: userRequestDto.lastName,
      phoneNumber: userRequestDto.phoneNumber,
    };
  }

  private mapToAddressRequestDto(userRequestDto: UpdateUserRequestDto): {
    postalCode: string;
    street: string;
    city: string;
    province: string;
    country: string;
  } {
    return {
      postalCode: userRequestDto.postalCode,
      street: userRequestDto.street,
      city: userRequestDto.city,
      province: userRequestDto.province,
      country: userRequestDto.country,
    };
  }
}
