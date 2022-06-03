import { Body, ConflictException, Controller, Get, InternalServerErrorException, NotFoundException, Param, Post, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'src/public/user/routes/authentication/guards/access-token.guard';
import { PublicRoute } from 'src/shared/constants/public.route';
import { CreateResponseModel } from 'src/shared/models/responses/create.response.model';
import { FetchResponseModel } from 'src/shared/models/responses/fetch.response.model';
import { MedicationModel } from '../../structs/medication.model';
import { CreateMedicationDTO } from './dtos/create-medication.dto';
import { FetchMedicationDTO } from './dtos/fetch-medication.dto';
import { MedicationService } from './services/medication.service';

@Controller(`${PublicRoute.MEDICATIONS}`)
export class MedicationController {
    public constructor(
        private readonly _medicationService: MedicationService<MedicationModel>,
    ) { }

    @UseGuards(AccessTokenGuard)
    @Get()
    public async listMedications(): Promise<Array<FetchResponseModel<MedicationModel>>> {
        const medications = await this._medicationService.fetchBulk().catch((error) => {
            throw new InternalServerErrorException(error);
        });

        const responses: Array<FetchResponseModel<MedicationModel>> = new Array();

        for (const medication of medications) {
            responses.push(new FetchResponseModel<MedicationModel>(
                medication.medicationId,
                medication
            ));
        }

        return responses;
    }

    @UseGuards(AccessTokenGuard)
    @Get("/:id")
    public async listMedication(
        @Param("id") medicationId: FetchMedicationDTO,
    ): Promise<FetchResponseModel<MedicationModel>> {
        const medication = await this._medicationService.fetchOne({ userId: medicationId.medicationId }).catch((error) => {
            throw new InternalServerErrorException(error);
        });

        if (medication === null || medication === undefined) {
            throw new NotFoundException();
        }

        return new FetchResponseModel<MedicationModel>(medication.medicationId, medication);
    }

    @UseGuards(AccessTokenGuard)
    @Post()
    public async createMedication(@Body() createMedicationDTO: CreateMedicationDTO): Promise<CreateResponseModel<null>> {
        const medication = await this._medicationService.fetchOne({ signature: createMedicationDTO.signature }).catch((error) => {
            throw new InternalServerErrorException(error);
        });

        if (medication !== null && medication !== undefined) {
            throw new ConflictException();
        }

        await this._medicationService.createOne(createMedicationDTO).catch((error) => {
            throw new InternalServerErrorException(error);
        });

        const createdMedication = await this._medicationService.fetchOne({ signature: createMedicationDTO.signature }).catch((error) => {
            throw new InternalServerErrorException(error);
        });

        return new CreateResponseModel(createdMedication.medicationId, null, null);
    }
}
