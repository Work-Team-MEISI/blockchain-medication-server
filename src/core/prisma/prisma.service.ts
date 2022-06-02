import { Injectable, InternalServerErrorException, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    public constructor() {
        super({
            datasources: {
                db: {
                    url: process.env['DATABASE_URL']
                }
            }
        })
    }

    async onModuleInit() {
        await this.$connect().catch((error) => {
            throw new InternalServerErrorException();
        });
    }

    async onModuleDestroy() {
        await this.$disconnect().catch((error) => {
            throw new InternalServerErrorException();
        });
    }
}
