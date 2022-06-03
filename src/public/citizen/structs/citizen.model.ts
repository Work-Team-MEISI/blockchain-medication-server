export class CitizenModel {
    private readonly _citizenId: string;
    private readonly _socialSecurityId: string;
    private readonly _healthSecurityId: string;
    private readonly _name: string;
    private readonly _dateOfBirth: string;
    private readonly _createdAt: Date;
    private readonly _updatedAt: Date;

    public constructor(
        citizenId: string,
        socialSecurityId: string,
        healthSecurityId: string,
        name: string,
        dateOfBirth: string,
        createdAt: Date,
        updatedAt: Date,
    ) {
        this._citizenId = citizenId;
        this._socialSecurityId = socialSecurityId;
        this._healthSecurityId = healthSecurityId;
        this._name = name;
        this._dateOfBirth = dateOfBirth;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
    }

    public get citizenId(): string {
        return this._citizenId;
    }

    public get socialSecurityId(): string {
        return this._socialSecurityId;
    }

    public get healthSecurityId(): string {
        return this._healthSecurityId;
    }

    public get name(): string {
        return this._name;
    }

    public get dateOfBirth(): string {
        return this._dateOfBirth;
    }

    public get createdAt(): Date {
        return this._createdAt;
    }

    public get updatedAt(): Date {
        return this._updatedAt;
    }
}