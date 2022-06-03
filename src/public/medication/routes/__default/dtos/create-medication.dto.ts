import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMedicationDTO {
    @IsNotEmpty()
    @IsString()
    public readonly signature: string;

    @IsNotEmpty()
    @IsString()
    public readonly alias: string;

    @IsNotEmpty()
    @IsNumber()
    public readonly basePrice: string;
}