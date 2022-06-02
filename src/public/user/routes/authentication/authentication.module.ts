import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SharedModule } from 'src/shared/shared.module';
import { AuthenticationController } from './authentication.controller';
import { AccessTokenGuard } from './guards/access-token.guard';
import { AuthenticationService } from './services/authentication.service';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService, AccessTokenStrategy, RefreshTokenStrategy, AccessTokenGuard,],
  imports: [SharedModule, JwtModule.register({})]
})
export class AuthenticationModule { }
