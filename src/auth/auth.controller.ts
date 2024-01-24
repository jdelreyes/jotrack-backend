import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto, SignUpDto } from './dto';
import { User } from '@prisma/client';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  public login(
    @Body() authLogInDto: LogInDto,
  ): Promise<{ access_token: string }> {
    return this.authService.login(authLogInDto);
  }

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  public signup(@Body() authSignUpDto: SignUpDto): Promise<User> {
    return this.authService.signup(authSignUpDto);
  }
}
