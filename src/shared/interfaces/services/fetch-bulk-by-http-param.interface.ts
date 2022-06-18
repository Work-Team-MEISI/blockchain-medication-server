import { AbstractService } from "src/shared/abstracts/service.abstract";

export interface IFetchBulkByHttpParamService<T> extends AbstractService<T> {
    fetchBulkByHttpParam<K>(httpParams: K): Promise<Array<T>>;
}