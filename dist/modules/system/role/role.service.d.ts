import { EntityManager, Repository } from 'typeorm';
import { PagerDto } from '~/common/dto/pager.dto';
import { Pagination } from '~/helper/paginate/pagination';
import { MenuEntity } from '~/modules/system/menu/menu.entity';
import { RoleEntity } from '~/modules/system/role/role.entity';
import { RoleDto, RoleQueryDto, RoleUpdateDto } from './role.dto';
export declare class RoleService {
    private roleRepository;
    private menuRepository;
    private entityManager;
    constructor(roleRepository: Repository<RoleEntity>, menuRepository: Repository<MenuEntity>, entityManager: EntityManager);
    findAll({ page, pageSize, }: PagerDto): Promise<Pagination<RoleEntity>>;
    list({ page, pageSize, name, value, remark, status, }: RoleQueryDto): Promise<Pagination<RoleEntity>>;
    info(id: number): Promise<{
        menuIds: number[];
        name: string;
        value: string;
        remark: string;
        status: number;
        default: boolean;
        users: import("~/modules/user/user.entity").UserEntity[];
        menus: MenuEntity[];
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(id: number): Promise<void>;
    create({ menuIds, ...data }: RoleDto): Promise<{
        roleId: number;
    }>;
    update(id: any, { menuIds, ...data }: RoleUpdateDto): Promise<void>;
    getRoleIdsByUser(id: number): Promise<number[]>;
    getRoleValues(ids: number[]): Promise<string[]>;
    isAdminRoleByUser(uid: number): Promise<boolean>;
    hasAdminRole(rids: number[]): boolean;
    checkUserByRoleId(id: number): Promise<boolean>;
}
