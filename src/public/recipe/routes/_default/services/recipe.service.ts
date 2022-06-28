import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { IRecipeService } from '../recipe.service.interface';

@Injectable()
export class RecipeService<T> implements IRecipeService<T> {
  public constructor(
    private readonly _httpService: HttpService,
    private readonly _configService: ConfigService,
  ) {}

  public async fetchBulk(): Promise<Array<T>> {
    const header = String(this._configService.get('API_KEY'));
    const axiosResponse = await firstValueFrom(
      this._httpService.get('http://localhost:8080/med-recipes/', {
        headers: { 'api-key': header },
      }),
    ).catch((error) => {
      return error;
    });

    return axiosResponse.data;
  }

  public async fetchBulkByHttpParam<K>(httpParams: K): Promise<T[]> {
    const header = String(this._configService.get('API_KEY'));

    const axiosResponse = await firstValueFrom(
      this._httpService.get(`http://localhost:8080/med-recipes/${httpParams}`, {
        headers: { 'api-key': header },
      }),
    ).catch((error) => error);

    return axiosResponse.data;
  }

  public async createOne<K>(httpBody: K): Promise<void> {
    const header = String(this._configService.get('API_KEY'));
    console.log(header);

    return await firstValueFrom(
      this._httpService.post(`http://localhost:8080/med-recipes/`, httpBody, {
        headers: { 'api-key': header },
      }),
    ).catch((error) => {
      console.log(error);
      return error;
    });
  }
}
