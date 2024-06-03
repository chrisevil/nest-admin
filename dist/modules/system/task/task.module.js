"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModule = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const log_module_1 = require("../log/log.module");
const constant_1 = require("./constant");
const task_controller_1 = require("./task.controller");
const task_entity_1 = require("./task.entity");
const task_processor_1 = require("./task.processor");
const task_service_1 = require("./task.service");
const providers = [task_service_1.TaskService, task_processor_1.TaskConsumer];
let TaskModule = class TaskModule {
};
exports.TaskModule = TaskModule;
exports.TaskModule = TaskModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([task_entity_1.TaskEntity]),
            bull_1.BullModule.registerQueueAsync({
                name: constant_1.SYS_TASK_QUEUE_NAME,
                useFactory: (configService) => ({
                    redis: configService.get('redis'),
                    prefix: constant_1.SYS_TASK_QUEUE_PREFIX,
                }),
                inject: [config_1.ConfigService],
            }),
            log_module_1.LogModule,
        ],
        controllers: [task_controller_1.TaskController],
        providers: [...providers],
        exports: [typeorm_1.TypeOrmModule, ...providers],
    })
], TaskModule);
//# sourceMappingURL=task.module.js.map