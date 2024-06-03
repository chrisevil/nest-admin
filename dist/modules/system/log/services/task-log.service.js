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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskLogService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const paginate_1 = require("../../../../helper/paginate");
const task_log_entity_1 = require("../entities/task-log.entity");
let TaskLogService = class TaskLogService {
    taskLogRepository;
    constructor(taskLogRepository) {
        this.taskLogRepository = taskLogRepository;
    }
    async create(tid, status, time, err) {
        const result = await this.taskLogRepository.save({
            status,
            detail: err,
            time,
            task: { id: tid },
        });
        return result.id;
    }
    async list({ page, pageSize }) {
        const queryBuilder = await this.taskLogRepository
            .createQueryBuilder('task_log')
            .leftJoinAndSelect('task_log.task', 'task')
            .orderBy('task_log.id', 'DESC');
        return (0, paginate_1.paginate)(queryBuilder, {
            page,
            pageSize,
        });
    }
    async clearLog() {
        await this.taskLogRepository.clear();
    }
    async clearLogBeforeTime(time) {
        await this.taskLogRepository.delete({ createdAt: (0, typeorm_2.LessThan)(time) });
    }
};
exports.TaskLogService = TaskLogService;
exports.TaskLogService = TaskLogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_log_entity_1.TaskLogEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TaskLogService);
//# sourceMappingURL=task-log.service.js.map