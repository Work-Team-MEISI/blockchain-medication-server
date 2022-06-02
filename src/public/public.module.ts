import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MedicationModule } from './medication/medication.module';
import { CitizenModule } from './citizen/citizen.module';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [UserModule, MedicationModule, CitizenModule, RecipeModule]
})
export class PublicModule {}
