import { Module } from '@nestjs/common';
import { AuthenticationModule } from './routes/authentication/authentication.module';

@Module({
  imports: [AuthenticationModule]
})
export class UserModule {}
