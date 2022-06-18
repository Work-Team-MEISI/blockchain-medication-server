import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { IRecipeService } from '../recipe.service.interface';

@Injectable()
export class RecipeService<T> implements IRecipeService<T> {
    public constructor(
        private readonly _httpService: HttpService
    ) { }

    public async fetchBulk(): Promise<Array<T>> {
        const axiosResponse = await firstValueFrom(this._httpService.get("http://localhost:8080/med-recipes/")).catch((error) => error);

        return axiosResponse.data;
    }

    public async fetchBulkByHttpParam<K>(httpParams: K): Promise<T[]> {
        const axiosResponse = await firstValueFrom(this._httpService.get(`http://localhost:8080/med-recipes/${httpParams}`)).catch((error) => error);
    
        return axiosResponse.data;
    }

    public async createOne<K>(httpBody: K): Promise<void> {
        return await firstValueFrom(this._httpService.post(`http://localhost:8080/med-recipes/`, httpBody)).catch((error) => error);
    };
}
