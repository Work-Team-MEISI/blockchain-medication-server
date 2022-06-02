import { AbstractService } from "src/shared/abstracts/service.abstract";

export interface IUpdateOneService<T> extends AbstractService<T> {
    updateOne<K, V>(httpParams: K, httpBody: V): Promise<T>;
}