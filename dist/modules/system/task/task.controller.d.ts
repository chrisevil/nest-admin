import { Pagination } from '~/helper/paginate/pagination';
import { TaskEntity } from '~/modules/system/task/task.entity';
import { TaskDto, TaskQueryDto, TaskUpdateDto } from './task.dto';
import { TaskService } from './task.service';
export declare const permissions: {
    readonly LIST: "system:task:list";
    readonly CREATE: "system:task:create";
    readonly READ: "system:task:read";
    readonly UPDATE: "system:task:update";
    readonly DELETE: "system:task:delete";
    readonly ONCE: "system:task:once";
    readonly START: "system:task:start";
    readonly STOP: "system:task:stop";
};
export declare class TaskController {
    private taskService;
    constructor(taskService: TaskService);
    list(dto: TaskQueryDto): Promise<Pagination<TaskEntity>>;
    create(dto: TaskDto): Promise<void>;
    update(id: number, dto: TaskUpdateDto): Promise<void>;
    info(id: number): Promise<TaskEntity>;
    delete(id: number): Promise<void>;
    once(id: number): Promise<void>;
    stop(id: number): Promise<void>;
    start(id: number): Promise<void>;
}
