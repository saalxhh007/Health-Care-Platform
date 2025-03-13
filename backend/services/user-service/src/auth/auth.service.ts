import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LogUserDto } from 'src/user/dto/log-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  // Generate Access And Refresh Tokens
  private async generateTokens(userId: number, email: string) {
    const payload = { id: userId, email };

    const accessToken = await this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.JWT_ACCESS_EXPIRES,
    });

    const refreshToken = await this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async login(dto: LogUserDto) {
    const user = await this.userService.logUser(dto);
    if (!user) {
      throw new UnauthorizedException("Invalid username or password");
    }
    return this.generateTokens(user.id, user.email);
  }
  // Refresh Tokens
  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, { secret: process.env.JWT_REFRESH_SECRET });
      return this.generateTokens(payload.id, payload.email);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
