import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('/login')
  login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }

  @Post('/signup')
  signup(@Body() authDto: AuthDto) {
    return this.authService.signup(authDto);
  }
}
