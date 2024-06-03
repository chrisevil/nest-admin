import { Repository } from 'typeorm';
import { TaskLogQueryDto } from '../dto/log.dto';
import { TaskLogEntity } from '../entities/task-log.entity';
export declare class TaskLogService {
    private taskLogRepository;
    constructor(taskLogRepository: Repository<TaskLogEntity>);
    create(tid: number, status: number, time?: number, err?: string): Promise<number>;
    list({ page, pageSize }: TaskLogQueryDto): Promise<import("~/helper/paginate/pagination").Pagination<TaskLogEntity, import("~/helper/paginate/interface").IPaginationMeta>>;
    clearLog(): Promise<void>;
    clearLogBeforeTime(time: Date): Promise<void>;
}
