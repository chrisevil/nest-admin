import { PagerDto } from '~/common/dto/pager.dto';
export declare class RoleDto {
    name: string;
    value: string;
    remark?: string;
    status: number;
    menuIds?: number[];
}
declare const RoleUpdateDto_base: import("@nestjs/common").Type<Partial<RoleDto>>;
export declare class RoleUpdateDto extends RoleUpdateDto_base {
}
declare const RoleQueryDto_base: import("@nestjs/common").Type<Partial<RoleDto> & PagerDto<RoleDto>>;
export declare class RoleQueryDto extends RoleQueryDto_base {
    name?: string;
    value: string;
}
export {};
