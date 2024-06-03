import { Relation } from 'typeorm';
import { CommonEntity } from '~/common/entity/common.entity';
import { TaskEntity } from '../../task/task.entity';
export declare class TaskLogEntity extends CommonEntity {
    status: number;
    detail: string;
    consumeTime: number;
    task: Relation<TaskEntity>;
}
