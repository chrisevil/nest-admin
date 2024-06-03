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
exports.TaskEntity = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const common_entity_1 = require("../../../common/entity/common.entity");
let TaskEntity = class TaskEntity extends common_entity_1.CommonEntity {
    name;
    service;
    type;
    status;
    startTime;
    endTime;
    limit;
    cron;
    every;
    data;
    jobOpts;
    remark;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, service: { required: true, type: () => String }, type: { required: true, type: () => Number }, status: { required: true, type: () => Number }, startTime: { required: true, type: () => Date }, endTime: { required: true, type: () => Date }, limit: { required: true, type: () => Number }, cron: { required: true, type: () => String }, every: { required: true, type: () => Number }, data: { required: true, type: () => String }, jobOpts: { required: true, type: () => String }, remark: { required: true, type: () => String } };
    }
};
exports.TaskEntity = TaskEntity;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, unique: true }),
    (0, swagger_1.ApiProperty)({ description: '任务名' }),
    __metadata("design:type", String)
], TaskEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: '任务标识' }),
    __metadata("design:type", String)
], TaskEntity.prototype, "service", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', default: 0 }),
    (0, swagger_1.ApiProperty)({ description: '任务类型 0cron 1间隔' }),
    __metadata("design:type", Number)
], TaskEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', default: 1 }),
    (0, swagger_1.ApiProperty)({ description: '任务状态 0禁用 1启用' }),
    __metadata("design:type", Number)
], TaskEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_time', type: 'datetime', nullable: true }),
    (0, swagger_1.ApiProperty)({ description: '开始时间' }),
    __metadata("design:type", Date)
], TaskEntity.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_time', type: 'datetime', nullable: true }),
    (0, swagger_1.ApiProperty)({ description: '结束时间' }),
    __metadata("design:type", Date)
], TaskEntity.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true, default: 0 }),
    (0, swagger_1.ApiProperty)({ description: '间隔时间' }),
    __metadata("design:type", Number)
], TaskEntity.prototype, "limit", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({ description: 'cron表达式' }),
    __metadata("design:type", String)
], TaskEntity.prototype, "cron", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    (0, swagger_1.ApiProperty)({ description: '执行次数' }),
    __metadata("design:type", Number)
], TaskEntity.prototype, "every", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    (0, swagger_1.ApiProperty)({ description: '任务参数' }),
    __metadata("design:type", String)
], TaskEntity.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'job_opts', type: 'text', nullable: true }),
    (0, swagger_1.ApiProperty)({ description: '任务配置' }),
    __metadata("design:type", String)
], TaskEntity.prototype, "jobOpts", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({ description: '任务描述' }),
    __metadata("design:type", String)
], TaskEntity.prototype, "remark", void 0);
exports.TaskEntity = TaskEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'sys_task' })
], TaskEntity);
//# sourceMappingURL=task.entity.js.map