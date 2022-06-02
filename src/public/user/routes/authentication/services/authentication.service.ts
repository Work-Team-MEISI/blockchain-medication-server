import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { IAuthenticationService } from '../authentication.service.interface';

@Injectable()
export class AuthenticationService<T> implements IAuthenticationService<T> {
    public constructor(
        private readonly _prismaService: PrismaService
    ) { }

    public async fetchOne<K>(httpParams: K): Promise<T> {
        return await this._prismaService.userEntity.findUnique({
            where: httpParams
        }).catch((error) => error);
    }

    public async createOne<K>(httpBody: K): Promise<void> {
        return await this._prismaService.userEntity.create({
            data: httpBody as unknown as any
        }).catch((error) => {
            console.log(error);

            return error;
        });
    }

    public async updateOne<K, V>(httpParams: K, httpBody: V): Promise<void> {
        return await this._prismaService.userEntity.update({
            data: httpBody,
            where: httpParams
        }).catch((error) => {
            console.log(error);

            return error;
        });
    }
}
