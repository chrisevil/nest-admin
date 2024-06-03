import { OnModuleInit } from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
import { Queue } from 'bull';
import Redis from 'ioredis';
import { Repository } from 'typeorm';
import { Pagination } from '~/helper/paginate/pagination';
import { TaskEntity } from '~/modules/system/task/task.entity';
import { TaskDto, TaskQueryDto, TaskUpdateDto } from './task.dto';
export declare class TaskService implements OnModuleInit {
    private taskRepository;
    private taskQueue;
    private moduleRef;
    private reflector;
    private redis;
    private logger;
    constructor(taskRepository: Repository<TaskEntity>, taskQueue: Queue, moduleRef: ModuleRef, reflector: Reflector, redis: Redis);
    onModuleInit(): Promise<void>;
    initTask(): Promise<void>;
    list({ page, pageSize, name, service, type, status, }: TaskQueryDto): Promise<Pagination<TaskEntity>>;
    info(id: number): Promise<TaskEntity>;
    delete(task: TaskEntity): Promise<void>;
    once(task: TaskEntity): Promise<void | never>;
    create(dto: TaskDto): Promise<void>;
    update(id: number, dto: TaskUpdateDto): Promise<void>;
    start(task: TaskEntity): Promise<void>;
    stop(task: TaskEntity): Promise<void>;
    existJob(jobId: string): Promise<boolean>;
    updateTaskCompleteStatus(tid: number): Promise<void>;
    checkHasMissionMeta(nameOrInstance: string | unknown, exec: string): Promise<void | never>;
    callService(name: string, args: string): Promise<void>;
    safeParse(args: string): unknown | string;
}