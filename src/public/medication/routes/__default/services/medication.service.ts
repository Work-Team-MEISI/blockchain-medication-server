import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { IMedicationService } from '../medication.service.interface';

@Injectable()
export class MedicationService<T> implements IMedicationService<T> {
    public constructor(
        private readonly _prismaService: PrismaService
    ) { }

    public async fetchBulk(): Promise<Array<T>> {
        return this._prismaService.medicationEntity.findMany().catch((error) => error);
    }

    public async fetchOne<K>(httpParams: K): Promise<T> {
        return this._prismaService.medicationEntity.findUnique({
            where: httpParams
        }).catch((error) => error);
    };

    public async createOne<K>(httpBody: K): Promise<void> {
        return this._prismaService.medicationEntity.create({
            data: httpBody as unknown as any
        }).catch((error) => error);
    };
}
