import { MedicationModel } from "src/public/medication/structs/medication.model";

export class RecipeModel {
    private readonly _recipeId: string;
    private readonly _citizenId: string;
    private readonly _userId: string;
    private readonly _medications: Array<Omit<MedicationModel, "basePrice" & "createdAt" & "updatedAt">>;
    private readonly _createdAt: string;

    public constructor(
        recipeId: string,
        citizenId: string,
        userId: string,
        medications: Array<MedicationModel>,
        createdAt: string,
    ) {
        this._recipeId = recipeId;
        this._citizenId = citizenId;
        this._userId = userId;
        this._medications = medications;
        this._createdAt = createdAt;
    };

    public get recipeId(): string {
        return this._recipeId;
    }

    public get citizenId(): string {
        return this._citizenId;
    }

    public get userId(): string {
        return this._userId;
    }

    public get medications(): Array<Omit<MedicationModel, "basePrice" & "createdAt" & "updatedAt">> {
        return this._medications;
    }

    public get createdAt(): string {
        return this._createdAt;
    }
}