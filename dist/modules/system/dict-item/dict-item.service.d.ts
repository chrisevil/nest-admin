import { Repository } from 'typeorm';
import { Pagination } from '~/helper/paginate/pagination';
import { DictItemEntity } from '~/modules/system/dict-item/dict-item.entity';
import { DictItemDto, DictItemQueryDto } from './dict-item.dto';
export declare class DictItemService {
    private dictItemRepository;
    constructor(dictItemRepository: Repository<DictItemEntity>);
    page({ page, pageSize, label, value, typeId, }: DictItemQueryDto): Promise<Pagination<DictItemEntity>>;
    countConfigList(): Promise<number>;
    create(dto: DictItemDto): Promise<void>;
    update(id: number, dto: Partial<DictItemDto>): Promise<void>;
    delete(id: number): Promise<void>;
    findOne(id: number): Promise<DictItemEntity>;
    isExistKey(dto: DictItemDto): Promise<void | never>;
}
