import { AbstractService } from "src/shared/abstracts/service.abstract";

export interface IFetchBulkService<T> extends AbstractService<T> {
    fetchBulk(): Promise<Array<T>>;
}