import { Relation } from 'typeorm';
import { CommonEntity } from '~/common/entity/common.entity';
import { UserEntity } from '../../../user/user.entity';
export declare class LoginLogEntity extends CommonEntity {
    ip: string;
    address: string;
    provider: string;
    ua: string;
    user: Relation<UserEntity>;
}
