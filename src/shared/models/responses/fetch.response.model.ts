import { AbstractResponse } from "src/shared/abstracts/response.abstract";

export class FetchResponseModel<T> extends AbstractResponse<T> {
    public constructor(
        resourceId: string,
        resourceArgs: T | null,
    ) {
        super(resourceId, resourceArgs);
    }
}