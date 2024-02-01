import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInRequestDto, SignUpRequestDto } from './dto';
import { User } from '@prisma/client';
import { ApiResponse } from '@nestjs/swagger';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ description: 'logs in' })
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  public login(
    @Body() logInRequestDto: LogInRequestDto,
  ): Promise<{ access_token: string }> {
    return this.authService.login(logInRequestDto);
  }

  @ApiResponse({ description: 'registers' })
  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  public signup(@Body() signUpRequestDto: SignUpRequestDto): Promise<User> {
    return this.authService.signup(signUpRequestDto);
  }
}
