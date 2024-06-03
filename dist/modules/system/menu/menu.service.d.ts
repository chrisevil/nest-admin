import Redis from 'ioredis';
import { Repository } from 'typeorm';
import { SseService } from '~/modules/sse/sse.service';
import { MenuEntity } from '~/modules/system/menu/menu.entity';
import { RoleService } from '../role/role.service';
import { MenuDto, MenuQueryDto, MenuUpdateDto } from './menu.dto';
export declare class MenuService {
    private redis;
    private menuRepository;
    private roleService;
    private sseService;
    constructor(redis: Redis, menuRepository: Repository<MenuEntity>, roleService: RoleService, sseService: SseService);
    list({ name, path, permission, component, status, }: MenuQueryDto): Promise<MenuEntity[]>;
    create(menu: MenuDto): Promise<void>;
    update(id: number, menu: MenuUpdateDto): Promise<void>;
    getMenus(uid: number): Promise<import("~/utils").RouteRecordRaw[]>;
    check(dto: Partial<MenuDto>): Promise<void | never>;
    findChildMenus(mid: number): Promise<any>;
    getMenuItemInfo(mid: number): Promise<MenuEntity>;
    getMenuItemAndParentInfo(mid: number): Promise<{
        menu: MenuEntity;
        parentMenu: MenuEntity;
    }>;
    findRouterExist(path: string): Promise<boolean>;
    getPermissions(uid: number): Promise<string[]>;
    deleteMenuItem(mids: number[]): Promise<void>;
    refreshPerms(uid: number): Promise<void>;
    refreshOnlineUserPerms(isNoticeUser?: boolean): Promise<void>;
    checkRoleByMenuId(id: number): Promise<boolean>;
}
