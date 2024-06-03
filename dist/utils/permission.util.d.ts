import { MenuEntity } from '~/modules/system/menu/menu.entity';
export interface RouteRecordRaw {
    id: number;
    path: string;
    name: string;
    component?: string;
    redirect?: string;
    meta: {
        title: string;
        icon: string;
        isExt: boolean;
        extOpenMode: number;
        type: number;
        orderNo: number;
        show: number;
        activeMenu: string;
        status: number;
        keepAlive: number;
    };
    children?: RouteRecordRaw[];
}
export declare function generatorRouters(menus: MenuEntity[]): RouteRecordRaw[];
export declare function generatorMenu(menu: MenuEntity[]): any[];
export declare function checkIsDemoMode(): void;
