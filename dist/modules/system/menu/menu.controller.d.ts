import { MenuDto, MenuQueryDto, MenuUpdateDto } from './menu.dto';
import { MenuService } from './menu.service';
export declare const permissions: {
    readonly LIST: "system:menu:list";
    readonly CREATE: "system:menu:create";
    readonly READ: "system:menu:read";
    readonly UPDATE: "system:menu:update";
    readonly DELETE: "system:menu:delete";
};
export declare class MenuController {
    private menuService;
    constructor(menuService: MenuService);
    list(dto: MenuQueryDto): Promise<import("~/modules/system/menu/menu.entity").MenuEntity[]>;
    info(id: number): Promise<{
        menu: import("~/modules/system/menu/menu.entity").MenuEntity;
        parentMenu: import("~/modules/system/menu/menu.entity").MenuEntity;
    }>;
    create(dto: MenuDto): Promise<void>;
    update(id: number, dto: MenuUpdateDto): Promise<void>;
    delete(id: number): Promise<void>;
    getPermissions(): Promise<string[]>;
}
