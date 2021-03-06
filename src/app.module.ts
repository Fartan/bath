import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { ContactModule } from './contact/contact.module';
import { PetModule } from './pet/pet.module';
import { ServiceModule } from './service/service.module';
import { PurchaseModule } from './purchase/purchase.module';
import { OAuthModule } from './oauth/oauth.module';

@Module({
  imports: [TypeOrmModule.forRoot(),
    UserModule,
    PetModule,
    ContactModule,
    ServiceModule,
    PurchaseModule,
    OAuthModule
  ]
})
export class AppModule { }
