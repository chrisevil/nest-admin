import { Relation } from 'typeorm';
import { CommonEntity } from '~/common/entity/common.entity';
import { AccessTokenEntity } from '~/modules/auth/entities/access-token.entity';
import { DeptEntity } from '~/modules/system/dept/dept.entity';
import { RoleEntity } from '~/modules/system/role/role.entity';
export declare class UserEntity extends CommonEntity {
    username: string;
    password: string;
    psalt: string;
    nickname: string;
    avatar: string;
    qq: string;
    email: string;
    phone: string;
    remark: string;
    status: number;
    roles: Relation<RoleEntity[]>;
    dept: Relation<DeptEntity>;
    accessTokens: Relation<AccessTokenEntity[]>;
}
