import { PagerDto } from '~/common/dto/pager.dto';
export declare class ParamConfigDto {
    name: string;
    key: string;
    value: string;
    remark?: string;
}
export declare class ParamConfigQueryDto extends PagerDto {
    name: string;
}
