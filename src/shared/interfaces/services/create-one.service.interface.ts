import { AbstractService } from "src/shared/abstracts/service.abstract";

export interface ICreateOneService<T> extends AbstractService<T> {
    createOne<K>(httpBody: K): Promise<T>;
}