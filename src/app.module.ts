import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { PublicModule } from './public/public.module';
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './public/user/routes/authentication/guards/access-token.guard';

@Module({
  imports: [
    SharedModule,
    CoreModule,
    PublicModule,
    JwtModule,
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    }
  ]
})
export class AppModule { }
