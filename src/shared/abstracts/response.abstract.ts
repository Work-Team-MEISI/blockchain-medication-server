export abstract class AbstractResponse<T> {
    private readonly _resourceId: string;
    private readonly _resourceArgs: T | null;

    protected constructor(
        resourceId: string,
        resourceArgs: T | null,
    ) {
        this._resourceId = resourceId;
        this._resourceArgs = resourceArgs;
    }

    public get resourceId(): string {
        return this._resourceId;
    }

    public get resourceArgs(): T | null {
        return this._resourceArgs;
    }
}