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
exports.TaskLogEntity = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const common_entity_1 = require("../../../../common/entity/common.entity");
const task_entity_1 = require("../../task/task.entity");
let TaskLogEntity = class TaskLogEntity extends common_entity_1.CommonEntity {
    status;
    detail;
    consumeTime;
    task;
    static _OPENAPI_METADATA_FACTORY() {
        return { status: { required: true, type: () => Number }, detail: { required: true, type: () => String }, consumeTime: { required: true, type: () => Number }, task: { required: true, type: () => require("../../task/task.entity").TaskEntity } };
    }
};
exports.TaskLogEntity = TaskLogEntity;
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', default: 0 }),
    (0, swagger_1.ApiProperty)({ description: '任务状态：0失败，1成功' }),
    __metadata("design:type", Number)
], TaskLogEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    (0, swagger_1.ApiProperty)({ description: '任务日志信息' }),
    __metadata("design:type", String)
], TaskLogEntity.prototype, "detail", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true, name: 'consume_time', default: 0 }),
    (0, swagger_1.ApiProperty)({ description: '任务耗时' }),
    __metadata("design:type", Number)
], TaskLogEntity.prototype, "consumeTime", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => task_entity_1.TaskEntity),
    (0, typeorm_1.JoinColumn)({ name: 'task_id' }),
    __metadata("design:type", Object)
], TaskLogEntity.prototype, "task", void 0);
exports.TaskLogEntity = TaskLogEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'sys_task_log' })
], TaskLogEntity);
//# sourceMappingURL=task-log.entity.js.map