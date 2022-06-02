import { AbstractResponse } from "src/shared/abstracts/response.abstract";

export class UpdateResponseModel<T> extends AbstractResponse<T>{
    private readonly _oldResourceURL: string | null;
    private readonly _newResourceURL: string | null;

    public constructor(
        resourceId: string,
        oldResourceURL: string | null,
        newResourceURL: string | null,
        resourceArgs: T | null,
    ) {
        super(resourceId, resourceArgs);

        this._oldResourceURL = oldResourceURL;
        this._newResourceURL = newResourceURL;
    }

    public get oldResourceURL(): string | null {
        return this._oldResourceURL;
    }

    public get newResourceURL(): string | null {
        return this._newResourceURL;
    }
}