import { CommonEntity } from '~/common/entity/common.entity';
import { UserEntity } from '~/modules/user/user.entity';
import { AccmWorkManagementEntity } from '../workManagement/workManagement.entity';
export declare class AccmWorkNotificationEntity extends CommonEntity {
    userId: number;
    workManagementId: number;
    workManagement: AccmWorkManagementEntity;
    workContent: string;
    user: UserEntity;
    userName: string;
    workNotification: string;
    workImportant: number;
}
