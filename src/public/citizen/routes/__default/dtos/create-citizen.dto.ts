import { IsNotEmpty, IsString } from "class-validator";

export class CreateCitizenDTO {
    @IsNotEmpty()
    @IsString()
    public readonly socialSecurityId: string;

    @IsNotEmpty()
    @IsString()
    public readonly healthSecurityId: string;

    @IsNotEmpty()
    @IsString()
    public readonly name: string;

    @IsNotEmpty()
    @IsString()
    public readonly dateOfBirth: string;
}