import { SseService } from '~/modules/sse/sse.service';
import { RoleEntity } from '~/modules/system/role/role.entity';
import { MenuService } from '../menu/menu.service';
import { RoleDto, RoleQueryDto, RoleUpdateDto } from './role.dto';
import { RoleService } from './role.service';
export declare const permissions: {
    readonly LIST: "system:role:list";
    readonly CREATE: "system:role:create";
    readonly READ: "system:role:read";
    readonly UPDATE: "system:role:update";
    readonly DELETE: "system:role:delete";
};
export declare class RoleController {
    private roleService;
    private menuService;
    private sseService;
    constructor(roleService: RoleService, menuService: MenuService, sseService: SseService);
    list(dto: RoleQueryDto): Promise<import("~/helper/paginate/pagination").Pagination<RoleEntity, import("~/helper/paginate/interface").IPaginationMeta>>;
    info(id: number): Promise<{
        menuIds: number[];
        name: string;
        value: string;
        remark: string;
        status: number;
        default: boolean;
        users: import("~/modules/user/user.entity").UserEntity[];
        menus: import("~/modules/system/menu/menu.entity").MenuEntity[];
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(dto: RoleDto): Promise<void>;
    update(id: number, dto: RoleUpdateDto): Promise<void>;
    delete(id: number): Promise<void>;
}
