import { Repository } from 'typeorm';
import { Pagination } from '~/helper/paginate/pagination';
import { DictTypeEntity } from '~/modules/system/dict-type/dict-type.entity';
import { DictTypeDto, DictTypeQueryDto } from './dict-type.dto';
export declare class DictTypeService {
    private dictTypeRepository;
    constructor(dictTypeRepository: Repository<DictTypeEntity>);
    page({ page, pageSize, name, code, }: DictTypeQueryDto): Promise<Pagination<DictTypeEntity>>;
    getAll(): Promise<DictTypeEntity[]>;
    countConfigList(): Promise<number>;
    create(dto: DictTypeDto): Promise<void>;
    update(id: number, dto: Partial<DictTypeDto>): Promise<void>;
    delete(id: number): Promise<void>;
    findOne(id: number): Promise<DictTypeEntity>;
    isExistKey(name: string): Promise<void | never>;
}
