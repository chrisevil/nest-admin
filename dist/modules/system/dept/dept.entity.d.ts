import { Relation } from 'typeorm';
import { CommonEntity } from '~/common/entity/common.entity';
import { UserEntity } from '../../user/user.entity';
export declare class DeptEntity extends CommonEntity {
    name: string;
    orderNo: number;
    children: DeptEntity[];
    parent?: DeptEntity;
    users: Relation<UserEntity[]>;
}
