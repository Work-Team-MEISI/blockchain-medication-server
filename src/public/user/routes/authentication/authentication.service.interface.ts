import { ICreateOneService } from "src/shared/interfaces/services/create-one.service.interface";
import { IFetchOneService } from "src/shared/interfaces/services/fetch-one.service.interface";
import { IUpdateOneService } from "src/shared/interfaces/services/update-one.service.interface";

export interface IAuthenticationService<T> extends IFetchOneService<T>, ICreateOneService<void>, IUpdateOneService<void> { }