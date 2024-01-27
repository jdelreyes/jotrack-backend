import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInRequestDto, SignUpRequestDto } from './dto';
import { User } from '@prisma/client';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  public login(
    @Body() authLogInDto: LogInRequestDto,
  ): Promise<{ access_token: string }> {
    return this.authService.login(authLogInDto);
  }

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  public signup(@Body() authSignUpDto: SignUpRequestDto): Promise<User> {
    return this.authService.signup(authSignUpDto);
  }
}
