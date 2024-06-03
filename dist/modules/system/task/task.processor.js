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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskConsumer = void 0;
const bull_1 = require("@nestjs/bull");
const task_log_service_1 = require("../log/services/task-log.service");
const constant_1 = require("./constant");
const task_service_1 = require("./task.service");
let TaskConsumer = class TaskConsumer {
    taskService;
    taskLogService;
    constructor(taskService, taskLogService) {
        this.taskService = taskService;
        this.taskLogService = taskLogService;
    }
    async handle(job) {
        const startTime = Date.now();
        const { data } = job;
        try {
            await this.taskService.callService(data.service, data.args);
            const timing = Date.now() - startTime;
            await this.taskLogService.create(data.id, 1, timing);
        }
        catch (e) {
            const timing = Date.now() - startTime;
            await this.taskLogService.create(data.id, 0, timing, `${e}`);
        }
    }
    onCompleted(job) {
        this.taskService.updateTaskCompleteStatus(job.data.id);
    }
};
exports.TaskConsumer = TaskConsumer;
__decorate([
    (0, bull_1.Process)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskConsumer.prototype, "handle", null);
__decorate([
    (0, bull_1.OnQueueCompleted)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TaskConsumer.prototype, "onCompleted", null);
exports.TaskConsumer = TaskConsumer = __decorate([
    (0, bull_1.Processor)(constant_1.SYS_TASK_QUEUE_NAME),
    __metadata("design:paramtypes", [task_service_1.TaskService,
        task_log_service_1.TaskLogService])
], TaskConsumer);
//# sourceMappingURL=task.processor.js.map