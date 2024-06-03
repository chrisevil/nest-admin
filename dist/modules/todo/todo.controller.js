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
exports.TodoController = exports.permissions = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_result_decorator_1 = require("../../common/decorators/api-result.decorator");
const id_param_decorator_1 = require("../../common/decorators/id-param.decorator");
const permission_decorator_1 = require("../auth/decorators/permission.decorator");
const resource_decorator_1 = require("../auth/decorators/resource.decorator");
const resource_guard_1 = require("../auth/guards/resource.guard");
const todo_entity_1 = require("./todo.entity");
const todo_dto_1 = require("./todo.dto");
const todo_service_1 = require("./todo.service");
exports.permissions = (0, permission_decorator_1.definePermission)('todo', {
    LIST: 'list',
    CREATE: 'create',
    READ: 'read',
    UPDATE: 'update',
    DELETE: 'delete',
});
let TodoController = class TodoController {
    todoService;
    constructor(todoService) {
        this.todoService = todoService;
    }
    async list(dto) {
        return this.todoService.list(dto);
    }
    async info(id) {
        return this.todoService.detail(id);
    }
    async create(dto) {
        await this.todoService.create(dto);
    }
    async update(id, dto) {
        await this.todoService.update(id, dto);
    }
    async delete(id) {
        await this.todoService.delete(id);
    }
};
exports.TodoController = TodoController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '获取Todo列表' }),
    (0, api_result_decorator_1.ApiResult)({ type: [todo_entity_1.TodoEntity] }),
    (0, permission_decorator_1.Perm)(exports.permissions.LIST),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [todo_dto_1.TodoQueryDto]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '获取Todo详情' }),
    (0, api_result_decorator_1.ApiResult)({ type: todo_entity_1.TodoEntity }),
    (0, permission_decorator_1.Perm)(exports.permissions.READ),
    openapi.ApiResponse({ status: 200, type: require("./todo.entity").TodoEntity }),
    __param(0, (0, id_param_decorator_1.IdParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "info", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '创建Todo' }),
    (0, permission_decorator_1.Perm)(exports.permissions.CREATE),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [todo_dto_1.TodoDto]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '更新Todo' }),
    (0, permission_decorator_1.Perm)(exports.permissions.UPDATE),
    (0, resource_decorator_1.Resource)(todo_entity_1.TodoEntity),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, id_param_decorator_1.IdParam)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, todo_dto_1.TodoUpdateDto]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '删除Todo' }),
    (0, permission_decorator_1.Perm)(exports.permissions.DELETE),
    (0, resource_decorator_1.Resource)(todo_entity_1.TodoEntity),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, id_param_decorator_1.IdParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "delete", null);
exports.TodoController = TodoController = __decorate([
    (0, swagger_1.ApiTags)('Business - Todo模块'),
    (0, common_1.UseGuards)(resource_guard_1.ResourceGuard),
    (0, common_1.Controller)('todos'),
    __metadata("design:paramtypes", [todo_service_1.TodoService])
], TodoController);
//# sourceMappingURL=todo.controller.js.map