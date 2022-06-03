import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { ICitizenService } from '../citizen.service.interface';

@Injectable()
export class CitizenService<T> implements ICitizenService<T> {
    public constructor(
        private readonly _prismaService: PrismaService
    ) { }

    public async fetchBulk(): Promise<Array<T>> {
        return this._prismaService.citizenEntity.findMany().catch((error) => error);
    }

    public async fetchOne<K>(httpParams: K): Promise<T> {
        return this._prismaService.citizenEntity.findUnique({
            where: httpParams
        }).catch((error) => error);
    };

    public async createOne<K>(httpBody: K): Promise<void> {
        return this._prismaService.citizenEntity.create({
            data: httpBody as unknown as any
        }).catch((error) => error);
    };
}
