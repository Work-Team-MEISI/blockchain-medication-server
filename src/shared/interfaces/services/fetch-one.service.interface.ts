import { AbstractService } from "src/shared/abstracts/service.abstract";

export interface IFetchOneService<T> extends AbstractService<T> {
    fetchOne<K>(httpParams: K): Promise<T>;
}