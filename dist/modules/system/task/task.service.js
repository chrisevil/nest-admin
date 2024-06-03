"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var TaskService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const unknown_element_exception_1 = require("@nestjs/core/errors/exceptions/unknown-element.exception");
const typeorm_1 = require("@nestjs/typeorm");
const ioredis_1 = __importDefault(require("ioredis"));
const lodash_1 = require("lodash");
const typeorm_2 = require("typeorm");
const biz_exception_1 = require("../../../common/exceptions/biz.exception");
const error_code_constant_1 = require("../../../constants/error-code.constant");
const paginate_1 = require("../../../helper/paginate");
const task_entity_1 = require("./task.entity");
const mission_decorator_1 = require("../../tasks/mission.decorator");
const constant_1 = require("./constant");
let TaskService = TaskService_1 = class TaskService {
    taskRepository;
    taskQueue;
    moduleRef;
    reflector;
    redis;
    logger = new common_1.Logger(TaskService_1.name);
    constructor(taskRepository, taskQueue, moduleRef, reflector, redis) {
        this.taskRepository = taskRepository;
        this.taskQueue = taskQueue;
        this.moduleRef = moduleRef;
        this.reflector = reflector;
        this.redis = redis;
    }
    async onModuleInit() {
        await this.initTask();
    }
    async initTask() {
        const initKey = `${constant_1.SYS_TASK_QUEUE_PREFIX}:init`;
        const result = await this.redis
            .multi()
            .setnx(initKey, new Date().getTime())
            .expire(initKey, 60 * 30)
            .exec();
        if (result[0][1] === 0) {
            this.logger.log('Init task is lock', TaskService_1.name);
            return;
        }
        const jobs = await this.taskQueue.getJobs([
            'active',
            'delayed',
            'failed',
            'paused',
            'waiting',
            'completed',
        ]);
        jobs.forEach((j) => {
            j.remove();
        });
        const tasks = await this.taskRepository.findBy({ status: 1 });
        if (tasks && tasks.length > 0) {
            for (const t of tasks)
                await this.start(t);
        }
        await this.redis.del(initKey);
    }
    async list({ page, pageSize, name, service, type, status, }) {
        const queryBuilder = this.taskRepository
            .createQueryBuilder('task')
            .where({
            ...(name ? { name: (0, typeorm_2.Like)(`%${name}%`) } : null),
            ...(service ? { service: (0, typeorm_2.Like)(`%${service}%`) } : null),
            ...(type ? { type } : null),
            ...(!(0, lodash_1.isNil)(status) ? { status } : null),
        })
            .orderBy('task.id', 'ASC');
        return (0, paginate_1.paginate)(queryBuilder, { page, pageSize });
    }
    async info(id) {
        const task = this.taskRepository
            .createQueryBuilder('task')
            .where({ id })
            .getOne();
        if (!task)
            throw new common_1.NotFoundException('Task Not Found');
        return task;
    }
    async delete(task) {
        if (!task)
            throw new common_1.BadRequestException('Task is Empty');
        await this.stop(task);
        await this.taskRepository.delete(task.id);
    }
    async once(task) {
        if (task) {
            await this.taskQueue.add({ id: task.id, service: task.service, args: task.data }, { jobId: task.id, removeOnComplete: true, removeOnFail: true });
        }
        else {
            throw new common_1.BadRequestException('Task is Empty');
        }
    }
    async create(dto) {
        const result = await this.taskRepository.save(dto);
        const task = await this.info(result.id);
        if (result.status === 0)
            await this.stop(task);
        else if (result.status === constant_1.TaskStatus.Activited)
            await this.start(task);
    }
    async update(id, dto) {
        await this.taskRepository.update(id, dto);
        const task = await this.info(id);
        if (task.status === 0)
            await this.stop(task);
        else if (task.status === constant_1.TaskStatus.Activited)
            await this.start(task);
    }
    async start(task) {
        if (!task)
            throw new common_1.BadRequestException('Task is Empty');
        await this.stop(task);
        let repeat;
        if (task.type === 1) {
            repeat = {
                every: task.every,
            };
        }
        else {
            repeat = {
                cron: task.cron,
            };
            if (task.startTime)
                repeat.startDate = task.startTime;
            if (task.endTime)
                repeat.endDate = task.endTime;
        }
        if (task.limit > 0)
            repeat.limit = task.limit;
        const job = await this.taskQueue.add({ id: task.id, service: task.service, args: task.data }, { jobId: task.id, removeOnComplete: true, removeOnFail: true, repeat });
        if (job && job.opts) {
            await this.taskRepository.update(task.id, {
                jobOpts: JSON.stringify(job.opts.repeat),
                status: 1,
            });
        }
        else {
            await job?.remove();
            await this.taskRepository.update(task.id, {
                status: constant_1.TaskStatus.Disabled,
            });
            throw new common_1.BadRequestException('Task Start failed');
        }
    }
    async stop(task) {
        if (!task)
            throw new common_1.BadRequestException('Task is Empty');
        const exist = await this.existJob(task.id.toString());
        if (!exist) {
            await this.taskRepository.update(task.id, {
                status: constant_1.TaskStatus.Disabled,
            });
            return;
        }
        const jobs = await this.taskQueue.getJobs([
            'active',
            'delayed',
            'failed',
            'paused',
            'waiting',
            'completed',
        ]);
        jobs
            .filter(j => j.data.id === task.id)
            .forEach(async (j) => {
            await j.remove();
        });
        await this.taskQueue.removeRepeatable(JSON.parse(task.jobOpts));
        await this.taskRepository.update(task.id, { status: constant_1.TaskStatus.Disabled });
    }
    async existJob(jobId) {
        const jobs = await this.taskQueue.getRepeatableJobs();
        const ids = jobs.map((e) => {
            return e.id;
        });
        return ids.includes(jobId);
    }
    async updateTaskCompleteStatus(tid) {
        const jobs = await this.taskQueue.getRepeatableJobs();
        const task = await this.taskRepository.findOneBy({ id: tid });
        for (const job of jobs) {
            const currentTime = new Date().getTime();
            if (job.id === tid.toString() && job.next < currentTime) {
                await this.stop(task);
                break;
            }
        }
    }
    async checkHasMissionMeta(nameOrInstance, exec) {
        try {
            let service;
            if (typeof nameOrInstance === 'string')
                service = await this.moduleRef.get(nameOrInstance, { strict: false });
            else
                service = nameOrInstance;
            if (!service || !(exec in service))
                throw new common_1.NotFoundException('任务不存在');
            const hasMission = this.reflector.get(mission_decorator_1.MISSION_DECORATOR_KEY, service.constructor);
            if (!hasMission)
                throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.INSECURE_MISSION);
        }
        catch (e) {
            if (e instanceof unknown_element_exception_1.UnknownElementException) {
                throw new common_1.NotFoundException('任务不存在');
            }
            else {
                throw e;
            }
        }
    }
    async callService(name, args) {
        if (name) {
            const [serviceName, methodName] = name.split('.');
            if (!methodName)
                throw new common_1.BadRequestException('serviceName define BadRequestException');
            const service = await this.moduleRef.get(serviceName, {
                strict: false,
            });
            await this.checkHasMissionMeta(service, methodName);
            if ((0, lodash_1.isEmpty)(args)) {
                await service[methodName]();
            }
            else {
                const parseArgs = this.safeParse(args);
                if (Array.isArray(parseArgs)) {
                    await service[methodName](...parseArgs);
                }
                else {
                    await service[methodName](parseArgs);
                }
            }
        }
    }
    safeParse(args) {
        try {
            return JSON.parse(args);
        }
        catch (e) {
            return args;
        }
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = TaskService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.TaskEntity)),
    __param(1, (0, bull_1.InjectQueue)(constant_1.SYS_TASK_QUEUE_NAME)),
    __param(4, (0, nestjs_redis_1.InjectRedis)()),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object, core_1.ModuleRef,
        core_1.Reflector,
        ioredis_1.default])
], TaskService);
//# sourceMappingURL=task.service.js.map