import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { CitizenController } from './routes/__default/citizen.controller';
import { CitizenService } from './routes/__default/services/citizen.service';

@Module({
  controllers: [CitizenController],
  providers: [CitizenService],
  imports: [SharedModule]
})
export class CitizenModule { }
