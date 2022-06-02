export class UserModel {
    private readonly _userId: string;
    private readonly _username: string;
    private readonly _email: string;
    private readonly _password: string;
    private readonly _firstName: string;
    private readonly _lastName: string;
    private readonly _hashedRefreshToken: string | null;
    private readonly _createdAt: Date;
    private readonly _updatedAt: Date;

    public constructor(
        userId: string,
        username: string,
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        hashedRefreshToken: string | null,
        createdAt: Date,
        updatedAt: Date
    ) {
        this._userId = userId;
        this._username = username;
        this._email = email;
        this._password = password;
        this._firstName = firstName;
        this._lastName = lastName;
        this._hashedRefreshToken = hashedRefreshToken;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
    }

    public get userId(): string {
        return this._userId;
    }

    public get username(): string {
        return this._username;
    }

    public get email(): string {
        return this._email;
    }

    public get password(): string {
        return this._password;
    }

    public get firstName(): string {
        return this._firstName;
    }

    public get lastName(): string {
        return this._lastName;
    }

    public get hashedRefreshToken(): string | null {
        return this._hashedRefreshToken;
    }

    public get createdAt(): Date {
        return this._createdAt;
    }

    public get updatedAt(): Date {
        return this._updatedAt;
    }
}