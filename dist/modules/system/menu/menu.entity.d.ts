import { Relation } from 'typeorm';
import { CommonEntity } from '~/common/entity/common.entity';
import { RoleEntity } from '../role/role.entity';
export declare class MenuEntity extends CommonEntity {
    parentId: number;
    name: string;
    path: string;
    permission: string;
    type: number;
    icon: string;
    orderNo: number;
    component: string;
    isExt: boolean;
    extOpenMode: number;
    keepAlive: number;
    show: number;
    activeMenu: string;
    status: number;
    roles: Relation<RoleEntity[]>;
}
