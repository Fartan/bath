import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'
import { APP_INTERCEPTOR } from '@nestjs/core';

import { OAuthInterceptor } from './oauth.Interceptor';
import { OAuthService } from './oauth.service';
import { OAuthController } from './oauth.controller';
import { UserModule } from '../user/user.module';
import { OAuthGuard } from './oauth.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        issuer: process.env.JWT_ISSUER
      },
      verifyOptions: {
        issuer: process.env.JWT_ISSUER,
      }
    }),
    UserModule
  ],
  controllers: [OAuthController],
  exports: [OAuthService],
  providers: [OAuthService, OAuthGuard.register(),
    {
      provide: APP_INTERCEPTOR,
      useClass: OAuthInterceptor,
    }
  ]
})
export class OAuthModule { }
