import { CommonEntity } from '~/common/entity/common.entity';
export declare class TaskEntity extends CommonEntity {
    name: string;
    service: string;
    type: number;
    status: number;
    startTime: Date;
    endTime: Date;
    limit: number;
    cron: string;
    every: number;
    data: string;
    jobOpts: string;
    remark: string;
}
