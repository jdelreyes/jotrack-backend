import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() authDto: AuthDto) {
    console.log(authDto);
    return this.authService.login();
  }
  @Post('/signup')
  signup(@Body() authDto: AuthDto) {
    console.log(authDto);
    return this.authService.signup();
  }
}
