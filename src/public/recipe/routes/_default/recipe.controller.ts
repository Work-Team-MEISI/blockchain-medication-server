import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Injector } from '@nestjs/core/injector/injector';
import { MedicationService } from 'src/public/medication/routes/__default/services/medication.service';
import { MedicationModel } from 'src/public/medication/structs/medication.model';
import { AccessTokenGuard } from 'src/public/user/routes/authentication/guards/access-token.guard';
import { PublicRoute } from 'src/shared/constants/public.route';
import { CreateResponseModel } from 'src/shared/models/responses/create.response.model';
import { FetchResponseModel } from 'src/shared/models/responses/fetch.response.model';
import { RecipeModel } from '../../structs/recipe.model';
import { CreateRecipeDTO } from './dtos/create-recipe.dto';
import { FetchRecipeByCitizenDTO } from './dtos/fetch-recipe-by-citizen.dto';
import { RecipeService } from './services/recipe.service';

@Controller(`${PublicRoute.RECIPES}`)
export class RecipeController {
  public constructor(
    private readonly _recipeService: RecipeService<RecipeModel>,
    private readonly _medicationService: MedicationService<MedicationModel>,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  public async fetchRecipes(): Promise<Array<FetchResponseModel<RecipeModel>>> {
    const recipes = await this._recipeService.fetchBulk().catch((error) => {
      throw new InternalServerErrorException(error);
    });

    const responses: Array<FetchResponseModel<RecipeModel>> = new Array();

    for (const recipe of recipes) {
      responses.push(
        new FetchResponseModel<RecipeModel>(recipe.recipeId, recipe),
      );
    }

    return responses;
  }

  @UseGuards(AccessTokenGuard)
  @Get('/:id')
  public async fetchRecipesByCitizenId(
    @Param('id') citizenId: FetchRecipeByCitizenDTO,
  ): Promise<Array<FetchResponseModel<RecipeModel>>> {
    const recipes = await this._recipeService
      .fetchBulkByHttpParam(citizenId)
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });

    const responses: Array<FetchResponseModel<RecipeModel>> = new Array();

    for (const recipe of recipes) {
      responses.push(
        new FetchResponseModel<RecipeModel>(recipe.recipeId, recipe),
      );
    }

    return responses;
  }

  @UseGuards(AccessTokenGuard)
  @Post()
  public async createRecipe(
    @Body() createRecipeDTO: CreateRecipeDTO,
  ): Promise<Array<CreateResponseModel<RecipeModel>>> {
    const medications: Array<
      Omit<MedicationModel, 'basePrice' | 'createdAt' | 'updatedAt'>
    > = new Array<
      Omit<MedicationModel, 'basePrice' & 'createdAt' & 'updatedAt'>
    >();

    for (const medicationId of createRecipeDTO.medications) {
      const med = await this._medicationService
        .fetchOne({ medicationId: medicationId })
        .catch((error) => {
          throw new InternalServerErrorException(error);
        });

      const medication: Omit<
        MedicationModel,
        'basePrice' | 'createdAt' | 'updatedAt'
      > = {
        medicationId: med.medicationId,
        signature: med.signature,
        alias: med.alias,
      };

      medications.push(medication);
    }

    const recipe = {
      citizenId: createRecipeDTO.citizenId,
      userId: createRecipeDTO.userId,
      medications: medications,
      createdAt: new Date(createRecipeDTO.createdAt).toISOString(),
    };

    await this._recipeService.createOne(recipe).catch((error) => {
      throw new InternalServerErrorException(error);
    });

    const recipes = await this._recipeService
      .fetchBulkByHttpParam(createRecipeDTO.citizenId)
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });

    const responses: Array<CreateResponseModel<RecipeModel>> = new Array();

    for (const recipe of recipes) {
      responses.push(
        new CreateResponseModel<RecipeModel>(recipe.recipeId, null, recipe),
      );
    }

    return responses;
  }
}
