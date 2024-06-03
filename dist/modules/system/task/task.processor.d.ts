import { Job } from 'bull';
import { TaskLogService } from '../log/services/task-log.service';
import { TaskService } from './task.service';
export interface ExecuteData {
    id: number;
    args?: string | null;
    service: string;
}
export declare class TaskConsumer {
    private taskService;
    private taskLogService;
    constructor(taskService: TaskService, taskLogService: TaskLogService);
    handle(job: Job<ExecuteData>): Promise<void>;
    onCompleted(job: Job<ExecuteData>): void;
}
