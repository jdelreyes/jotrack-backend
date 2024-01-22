import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLogInDto } from './dto/login';
import { AuthSignUpDto } from './dto/signup';
import { User } from '@prisma/client';
import { Roles } from './decorator/roles.decorator';
import { RoleEnum } from './enum';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Roles(RoleEnum.ADMIN)
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  public login(
    @Body() authLogInDto: AuthLogInDto,
  ): Promise<{ access_token: string; user: User }> {
    return this.authService.login(authLogInDto);
  }

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  public signup(@Body() authSignUpDto: AuthSignUpDto): Promise<User> {
    return this.authService.signup(authSignUpDto);
  }
}
