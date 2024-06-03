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
exports.TaskController = exports.permissions = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_result_decorator_1 = require("../../../common/decorators/api-result.decorator");
const id_param_decorator_1 = require("../../../common/decorators/id-param.decorator");
const swagger_decorator_1 = require("../../../common/decorators/swagger.decorator");
const permission_decorator_1 = require("../../auth/decorators/permission.decorator");
const task_entity_1 = require("./task.entity");
const task_dto_1 = require("./task.dto");
const task_service_1 = require("./task.service");
exports.permissions = (0, permission_decorator_1.definePermission)('system:task', {
    LIST: 'list',
    CREATE: 'create',
    READ: 'read',
    UPDATE: 'update',
    DELETE: 'delete',
    ONCE: 'once',
    START: 'start',
    STOP: 'stop',
});
let TaskController = class TaskController {
    taskService;
    constructor(taskService) {
        this.taskService = taskService;
    }
    async list(dto) {
        return this.taskService.list(dto);
    }
    async create(dto) {
        const serviceCall = dto.service.split('.');
        await this.taskService.checkHasMissionMeta(serviceCall[0], serviceCall[1]);
        await this.taskService.create(dto);
    }
    async update(id, dto) {
        const serviceCall = dto.service.split('.');
        await this.taskService.checkHasMissionMeta(serviceCall[0], serviceCall[1]);
        await this.taskService.update(id, dto);
    }
    async info(id) {
        return this.taskService.info(id);
    }
    async delete(id) {
        const task = await this.taskService.info(id);
        await this.taskService.delete(task);
    }
    async once(id) {
        const task = await this.taskService.info(id);
        await this.taskService.once(task);
    }
    async stop(id) {
        const task = await this.taskService.info(id);
        await this.taskService.stop(task);
    }
    async start(id) {
        const task = await this.taskService.info(id);
        await this.taskService.start(task);
    }
};
exports.TaskController = TaskController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '获取任务列表' }),
    (0, api_result_decorator_1.ApiResult)({ type: [task_entity_1.TaskEntity], isPage: true }),
    (0, permission_decorator_1.Perm)(exports.permissions.LIST),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_dto_1.TaskQueryDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '添加任务' }),
    (0, permission_decorator_1.Perm)(exports.permissions.CREATE),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_dto_1.TaskDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '更新任务' }),
    (0, permission_decorator_1.Perm)(exports.permissions.UPDATE),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, id_param_decorator_1.IdParam)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, task_dto_1.TaskUpdateDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '查询任务详细信息' }),
    (0, api_result_decorator_1.ApiResult)({ type: task_entity_1.TaskEntity }),
    (0, permission_decorator_1.Perm)(exports.permissions.READ),
    openapi.ApiResponse({ status: 200, type: require("./task.entity").TaskEntity }),
    __param(0, (0, id_param_decorator_1.IdParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "info", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '删除任务' }),
    (0, permission_decorator_1.Perm)(exports.permissions.DELETE),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, id_param_decorator_1.IdParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "delete", null);
__decorate([
    (0, common_1.Put)(':id/once'),
    (0, swagger_1.ApiOperation)({ summary: '手动执行一次任务' }),
    (0, permission_decorator_1.Perm)(exports.permissions.ONCE),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, id_param_decorator_1.IdParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "once", null);
__decorate([
    (0, common_1.Put)(':id/stop'),
    (0, swagger_1.ApiOperation)({ summary: '停止任务' }),
    (0, permission_decorator_1.Perm)(exports.permissions.STOP),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, id_param_decorator_1.IdParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "stop", null);
__decorate([
    (0, common_1.Put)(':id/start'),
    (0, swagger_1.ApiOperation)({ summary: '启动任务' }),
    (0, permission_decorator_1.Perm)(exports.permissions.START),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, id_param_decorator_1.IdParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "start", null);
exports.TaskController = TaskController = __decorate([
    (0, swagger_1.ApiTags)('System - 任务调度模块'),
    (0, swagger_decorator_1.ApiSecurityAuth)(),
    (0, common_1.Controller)('tasks'),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskController);
//# sourceMappingURL=task.controller.js.map