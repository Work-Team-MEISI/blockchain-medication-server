import { ICreateOneService } from "src/shared/interfaces/services/create-one.service.interface";
import { IFetchBulkService } from "src/shared/interfaces/services/fetch-bulk.service.interface";
import { IFetchOneService } from "src/shared/interfaces/services/fetch-one.service.interface";

export interface IMedicationService<T> extends IFetchBulkService<T>, IFetchOneService<T>, ICreateOneService<void> { }