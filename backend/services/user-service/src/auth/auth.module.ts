import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.stratery';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: process.env.JWT_ACCESS_EXPIRES },
    }),
],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
