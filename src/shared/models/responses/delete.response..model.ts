import { AbstractResponse } from "src/shared/abstracts/response.abstract";

export class DeleteResponseModel<T> extends AbstractResponse<T> {
    private readonly _oldResourceURL: string | null;

    public constructor(
        resourceId: string,
        oldResourceURL: string | null,
        resourceArgs: T | null,
    ) {
        super(resourceId, resourceArgs);

        this._oldResourceURL = oldResourceURL;
    }

    public get oldResourceURL(): string | null {
        return this._oldResourceURL;
    }
}