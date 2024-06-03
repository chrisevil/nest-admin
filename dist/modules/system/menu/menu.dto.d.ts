export declare class MenuDto {
    type: number;
    parentId: number;
    name: string;
    orderNo: number;
    path: string;
    isExt: boolean;
    extOpenMode: number;
    show: number;
    activeMenu?: string;
    keepAlive: number;
    status: number;
    icon?: string;
    permission: string;
    component?: string;
}
declare const MenuUpdateDto_base: import("@nestjs/common").Type<Partial<MenuDto>>;
export declare class MenuUpdateDto extends MenuUpdateDto_base {
}
declare const MenuQueryDto_base: import("@nestjs/common").Type<Partial<MenuDto>>;
export declare class MenuQueryDto extends MenuQueryDto_base {
}
export {};
