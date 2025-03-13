import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogUserDto } from 'src/user/dto/log-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @Post('login')
  async login(@Body() dto: LogUserDto) { 
    return this.authService.login(dto);
  }

  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }
} 
