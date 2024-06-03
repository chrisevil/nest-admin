import { MenuEntity } from '~/modules/system/menu/menu.entity';
export declare class AccountUpdateDto {
    nickname: string;
    email: string;
    qq: string;
    phone: string;
    avatar: string;
    remark: string;
}
export declare class ResetPasswordDto {
    accessToken: string;
    password: string;
}
declare const MenuMeta_base: import("@nestjs/common").Type<Partial<Omit<MenuEntity, "name" | "path" | "id" | "createdAt" | "updatedAt" | "parentId" | "roles">>>;
export declare class MenuMeta extends MenuMeta_base {
    title: string;
}
declare const AccountMenus_base: import("@nestjs/common").Type<Pick<MenuEntity, "name" | "path" | "id" | "component">>;
export declare class AccountMenus extends AccountMenus_base {
    meta: MenuMeta;
}
export {};
