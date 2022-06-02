import { AbstractResponse } from "src/shared/abstracts/response.abstract";

export class CreateResponseModel<T> extends AbstractResponse<T>{
    private readonly _newResourceURL: string | null;

    public constructor(
        resourceId: string,
        newResourceURL: string | null,
        resourceArgs: T | null,
    ) {
        super(resourceId, resourceArgs);

        this._newResourceURL = newResourceURL;
    }

    public get newResourceURL(): string | null {
        return this._newResourceURL;
    }
}