import { Pagination } from '~/helper/paginate/pagination';
import { DictItemEntity } from '~/modules/system/dict-item/dict-item.entity';
import { DictItemDto, DictItemQueryDto } from './dict-item.dto';
import { DictItemService } from './dict-item.service';
export declare const permissions: {
    readonly LIST: "system:dict-item:list";
    readonly CREATE: "system:dict-item:create";
    readonly READ: "system:dict-item:read";
    readonly UPDATE: "system:dict-item:update";
    readonly DELETE: "system:dict-item:delete";
};
export declare class DictItemController {
    private dictItemService;
    constructor(dictItemService: DictItemService);
    list(dto: DictItemQueryDto): Promise<Pagination<DictItemEntity>>;
    create(dto: DictItemDto, user: IAuthUser): Promise<void>;
    info(id: number): Promise<DictItemEntity>;
    update(id: number, dto: DictItemDto, user: IAuthUser): Promise<void>;
    delete(id: number): Promise<void>;
}
