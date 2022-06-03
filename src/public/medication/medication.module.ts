import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { MedicationController } from './routes/__default/medication.controller';
import { MedicationService } from './routes/__default/services/medication.service';

@Module({
  controllers: [MedicationController],
  providers: [MedicationService],
  imports: [SharedModule]
})
export class MedicationModule { }
