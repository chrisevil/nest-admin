import { Pagination } from '~/helper/paginate/pagination';
import { DictTypeEntity } from '~/modules/system/dict-type/dict-type.entity';
import { DictTypeDto, DictTypeQueryDto } from './dict-type.dto';
import { DictTypeService } from './dict-type.service';
export declare const permissions: {
    readonly LIST: "system:dict-type:list";
    readonly CREATE: "system:dict-type:create";
    readonly READ: "system:dict-type:read";
    readonly UPDATE: "system:dict-type:update";
    readonly DELETE: "system:dict-type:delete";
};
export declare class DictTypeController {
    private dictTypeService;
    constructor(dictTypeService: DictTypeService);
    list(dto: DictTypeQueryDto): Promise<Pagination<DictTypeEntity>>;
    getAll(): Promise<DictTypeEntity[]>;
    create(dto: DictTypeDto, user: IAuthUser): Promise<void>;
    info(id: number): Promise<DictTypeEntity>;
    update(id: number, dto: DictTypeDto, user: IAuthUser): Promise<void>;
    delete(id: number): Promise<void>;
}
