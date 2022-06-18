import { Body, ConflictException, Controller, Get, InternalServerErrorException, NotFoundException, Param, Post, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'src/public/user/routes/authentication/guards/access-token.guard';
import { PublicRoute } from 'src/shared/constants/public.route';
import { CreateResponseModel } from 'src/shared/models/responses/create.response.model';
import { FetchResponseModel } from 'src/shared/models/responses/fetch.response.model';
import { CitizenModel } from '../../structs/citizen.model';
import { CreateCitizenDTO } from './dtos/create-citizen.dto';
import { FetchCitizenDTO } from './dtos/fetch-citizen.dto';
import { CitizenService } from './services/citizen.service';

@Controller(`${PublicRoute.CITIZENS}`)
export class CitizenController {
    public constructor(
        private readonly _citizenService: CitizenService<CitizenModel>,
    ) { }

    @UseGuards(AccessTokenGuard)
    @Get()
    public async listCitizens(): Promise<Array<FetchResponseModel<CitizenModel>>> {
        const citizens = await this._citizenService.fetchBulk().catch((error) => {
            throw new InternalServerErrorException(error);
        });

        const responses: Array<FetchResponseModel<CitizenModel>> = new Array();

        for (const citizen of citizens) {
            responses.push(new FetchResponseModel<CitizenModel>(
                citizen.citizenId,
                citizen
            ));
        }

        return responses;
    }

    @UseGuards(AccessTokenGuard)
    @Get("/:id")
    public async listCitizen(
        @Param("id") citizenId: string,
    ): Promise<FetchResponseModel<CitizenModel>> {
        const citizen = await this._citizenService.fetchOne({ citizenId: citizenId }).catch((error) => {
            throw new InternalServerErrorException(error);
        });

        if (citizen === null || citizen === undefined) {
            throw new NotFoundException();
        }

        return new FetchResponseModel<CitizenModel>(citizen.citizenId, citizen);
    }

    @UseGuards(AccessTokenGuard)
    @Post()
    public async createCitizen(@Body() createcitizenDTO: CreateCitizenDTO): Promise<CreateResponseModel<null>> {
        const citizen = await this._citizenService.fetchOne({ socialSecurityId: createcitizenDTO.socialSecurityId }).catch((error) => {
            throw new InternalServerErrorException(error);
        });
        

        if (citizen !== null && citizen !== undefined) {
            throw new ConflictException();
        }

        await this._citizenService.createOne(createcitizenDTO).catch((error) => {
            throw new InternalServerErrorException(error);
        });

        const createdcitizen = await this._citizenService.fetchOne({ socialSecurityId: createcitizenDTO.socialSecurityId }).catch((error) => {
            throw new InternalServerErrorException(error);
        });

        return new CreateResponseModel(createdcitizen.citizenId, null, null);
    }
}
