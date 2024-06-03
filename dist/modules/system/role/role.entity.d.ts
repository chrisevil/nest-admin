import { Relation } from 'typeorm';
import { CommonEntity } from '~/common/entity/common.entity';
import { UserEntity } from '../../user/user.entity';
import { MenuEntity } from '../menu/menu.entity';
export declare class RoleEntity extends CommonEntity {
    name: string;
    value: string;
    remark: string;
    status: number;
    default: boolean;
    users: Relation<UserEntity[]>;
    menus: Relation<MenuEntity[]>;
}
