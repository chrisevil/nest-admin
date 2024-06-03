import { Pagination } from '~/helper/paginate/pagination';
import { StorageDeleteDto, StoragePageDto } from './storage.dto';
import { StorageInfo } from './storage.modal';
import { StorageService } from './storage.service';
export declare const permissions: {
    readonly LIST: "tool:storage:list";
    readonly DELETE: "tool:storage:delete";
};
export declare class StorageController {
    private storageService;
    constructor(storageService: StorageService);
    list(dto: StoragePageDto): Promise<Pagination<StorageInfo>>;
    delete(dto: StorageDeleteDto): Promise<void>;
}
