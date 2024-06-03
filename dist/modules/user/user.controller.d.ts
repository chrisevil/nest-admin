import { MenuService } from '~/modules/system/menu/menu.service';
import { UserPasswordDto } from './dto/password.dto';
import { UserDto, UserQueryDto, UserUpdateDto } from './dto/user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
export declare const permissions: {
    readonly LIST: "system:user:list";
    readonly CREATE: "system:user:create";
    readonly READ: "system:user:read";
    readonly UPDATE: "system:user:update";
    readonly DELETE: "system:user:delete";
    readonly PASSWORD_UPDATE: "system:user:password:update";
    readonly PASSWORD_RESET: "system:user:pass:reset";
};
export declare class UserController {
    private userService;
    private menuService;
    constructor(userService: UserService, menuService: MenuService);
    list(dto: UserQueryDto): Promise<import("~/helper/paginate/pagination").Pagination<UserEntity, import("~/helper/paginate/interface").IPaginationMeta>>;
    read(id: number): Promise<UserEntity>;
    create(dto: UserDto): Promise<void>;
    update(id: number, dto: UserUpdateDto): Promise<void>;
    delete(ids: number[]): Promise<void>;
    password(id: number, dto: UserPasswordDto): Promise<void>;
}
