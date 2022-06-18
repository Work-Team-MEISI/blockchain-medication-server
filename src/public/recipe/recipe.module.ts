import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { MedicationService } from '../medication/routes/__default/services/medication.service';
import { RecipeController } from './routes/_default/recipe.controller';
import { RecipeService } from './routes/_default/services/recipe.service';

@Module({
    controllers: [RecipeController],
    imports: [HttpModule, SharedModule],
    providers: [RecipeService, MedicationService]
})
export class RecipeModule {}
