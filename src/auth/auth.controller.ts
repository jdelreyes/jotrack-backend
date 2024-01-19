import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLogInDto } from './dto/login';
import { AuthSignUpDto } from './dto/signup';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @HttpCode(200)
  public login(@Body() authLogInDto: AuthLogInDto) {
    return this.authService.login(authLogInDto);
  }

  @Post('/signup')
  @HttpCode(201)
  public signup(@Body() authSignUpDto: AuthSignUpDto) {
    return this.authService.signup(authSignUpDto);
  }
}
