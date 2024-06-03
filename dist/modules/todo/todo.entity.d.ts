import { Relation } from 'typeorm';
import { CommonEntity } from '~/common/entity/common.entity';
import { UserEntity } from '~/modules/user/user.entity';
export declare class TodoEntity extends CommonEntity {
    value: string;
    status: boolean;
    user: Relation<UserEntity>;
}
