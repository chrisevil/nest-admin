import { Repository } from 'typeorm';
import { Pagination } from '~/helper/paginate/pagination';
import { ParamConfigEntity } from '~/modules/system/param-config/param-config.entity';
import { ParamConfigDto, ParamConfigQueryDto } from './param-config.dto';
export declare class ParamConfigService {
    private paramConfigRepository;
    constructor(paramConfigRepository: Repository<ParamConfigEntity>);
    page({ page, pageSize, name, }: ParamConfigQueryDto): Promise<Pagination<ParamConfigEntity>>;
    countConfigList(): Promise<number>;
    create(dto: ParamConfigDto): Promise<void>;
    update(id: number, dto: Partial<ParamConfigDto>): Promise<void>;
    delete(id: number): Promise<void>;
    findOne(id: number): Promise<ParamConfigEntity>;
    isExistKey(key: string): Promise<void | never>;
    findValueByKey(key: string): Promise<string | null>;
}
