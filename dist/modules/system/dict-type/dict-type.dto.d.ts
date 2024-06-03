import { PagerDto } from '~/common/dto/pager.dto';
import { DictTypeEntity } from './dict-type.entity';
declare const DictTypeDto_base: import("@nestjs/common").Type<Partial<DictTypeEntity>>;
export declare class DictTypeDto extends DictTypeDto_base {
    name: string;
    code: string;
    status?: number;
    remark?: string;
}
export declare class DictTypeQueryDto extends PagerDto {
    name: string;
    code: string;
}
export {};
