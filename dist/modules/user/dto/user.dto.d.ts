import { PagerDto } from '~/common/dto/pager.dto';
export declare class UserDto {
    avatar?: string;
    username: string;
    password: string;
    roleIds: number[];
    deptId?: number;
    nickname: string;
    email: string;
    phone?: string;
    qq?: string;
    remark?: string;
    status: number;
}
declare const UserUpdateDto_base: import("@nestjs/common").Type<Partial<UserDto>>;
export declare class UserUpdateDto extends UserUpdateDto_base {
}
declare const UserQueryDto_base: import("@nestjs/common").Type<Partial<UserDto> & PagerDto<UserDto>>;
export declare class UserQueryDto extends UserQueryDto_base {
    deptId?: number;
    status?: number;
}
export {};
