import { PagerDto } from '~/common/dto/pager.dto';
import { DictItemEntity } from './dict-item.entity';
declare const DictItemDto_base: import("@nestjs/common").Type<Partial<DictItemEntity>>;
export declare class DictItemDto extends DictItemDto_base {
    typeId: number;
    label: string;
    value: string;
    status?: number;
    remark?: string;
}
export declare class DictItemQueryDto extends PagerDto {
    typeId: number;
    label?: string;
    value?: string;
}
export {};
