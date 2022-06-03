export class MedicationModel {
    private readonly _medicationId: string;
    private readonly _signature: string;
    private readonly _alias: string;
    private readonly _basePrice: number;
    private readonly _createdAt: Date;
    private readonly _updatedAt: Date;


    public constructor(
        medicationId: string,
        signature: string,
        alias: string,
        basePrice: number,
        createdAt: Date,
        updatedAt: Date
    ) {
        this._medicationId = medicationId;
        this._signature = signature;
        this._alias = alias;
        this._basePrice = basePrice;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
    }

    public get medicationId(): string {
        return this._medicationId;
    }

    public get signature(): string {
        return this._signature;
    }

    public get alias(): string {
        return this._alias;
    }

    public get basePrice(): number {
        return this._basePrice;
    }

    public get createdAt(): Date {
        return this._createdAt;
    }

    public get updatedAt(): Date {
        return this._updatedAt;
    }

}