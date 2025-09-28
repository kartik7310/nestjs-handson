import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
// import { jwtConstants } from './constants';

@Module({

  imports: [
      ConfigModule.forRoot(),
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRETE,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
 
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
