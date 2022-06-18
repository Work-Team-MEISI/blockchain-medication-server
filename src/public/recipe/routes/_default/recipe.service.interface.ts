import { ICreateOneService } from "src/shared/interfaces/services/create-one.service.interface";
import { IFetchBulkByHttpParamService } from "src/shared/interfaces/services/fetch-bulk-by-http-param.interface";
import { IFetchBulkService } from "src/shared/interfaces/services/fetch-bulk.service.interface";

export interface IRecipeService<T> extends IFetchBulkService<T>, IFetchBulkByHttpParamService<T>, ICreateOneService<void> { }