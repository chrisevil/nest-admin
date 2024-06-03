import { Pagination } from '~/helper/paginate/pagination';
import { ParamConfigEntity } from '~/modules/system/param-config/param-config.entity';
import { ParamConfigDto, ParamConfigQueryDto } from './param-config.dto';
import { ParamConfigService } from './param-config.service';
export declare const permissions: {
    readonly LIST: "system:param-config:list";
    readonly CREATE: "system:param-config:create";
    readonly READ: "system:param-config:read";
    readonly UPDATE: "system:param-config:update";
    readonly DELETE: "system:param-config:delete";
};
export declare class ParamConfigController {
    private paramConfigService;
    constructor(paramConfigService: ParamConfigService);
    list(dto: ParamConfigQueryDto): Promise<Pagination<ParamConfigEntity>>;
    create(dto: ParamConfigDto): Promise<void>;
    info(id: number): Promise<ParamConfigEntity>;
    update(id: number, dto: ParamConfigDto): Promise<void>;
    delete(id: number): Promise<void>;
}
