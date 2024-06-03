import { CommonEntity } from '~/common/entity/common.entity';
import { UserEntity } from '~/modules/user/user.entity';
export declare class AccmWorkManagementEntity extends CommonEntity {
    userId: number;
    user: UserEntity;
    userName: string;
    workContent: string;
    workStart: Date;
    workEnd: Date;
    workImportant: number;
    isCompleted: number;
}
