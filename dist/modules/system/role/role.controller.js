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
exports.RoleController = exports.permissions = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_result_decorator_1 = require("../../../common/decorators/api-result.decorator");
const id_param_decorator_1 = require("../../../common/decorators/id-param.decorator");
const swagger_decorator_1 = require("../../../common/decorators/swagger.decorator");
const permission_decorator_1 = require("../../auth/decorators/permission.decorator");
const sse_service_1 = require("../../sse/sse.service");
const role_entity_1 = require("./role.entity");
const menu_service_1 = require("../menu/menu.service");
const role_dto_1 = require("./role.dto");
const role_model_1 = require("./role.model");
const role_service_1 = require("./role.service");
exports.permissions = (0, permission_decorator_1.definePermission)('system:role', {
    LIST: 'list',
    CREATE: 'create',
    READ: 'read',
    UPDATE: 'update',
    DELETE: 'delete',
});
let RoleController = class RoleController {
    roleService;
    menuService;
    sseService;
    constructor(roleService, menuService, sseService) {
        this.roleService = roleService;
        this.menuService = menuService;
        this.sseService = sseService;
    }
    async list(dto) {
        return this.roleService.list(dto);
    }
    async info(id) {
        return this.roleService.info(id);
    }
    async create(dto) {
        await this.roleService.create(dto);
    }
    async update(id, dto) {
        await this.roleService.update(id, dto);
        await this.menuService.refreshOnlineUserPerms(false);
        this.sseService.noticeClientToUpdateMenusByRoleIds([id]);
    }
    async delete(id) {
        if (await this.roleService.checkUserByRoleId(id))
            throw new common_1.BadRequestException('该角色存在关联用户，无法删除');
        await this.roleService.delete(id);
        await this.menuService.refreshOnlineUserPerms(false);
        this.sseService.noticeClientToUpdateMenusByRoleIds([id]);
    }
};
exports.RoleController = RoleController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '获取角色列表' }),
    (0, api_result_decorator_1.ApiResult)({ type: [role_entity_1.RoleEntity], isPage: true }),
    (0, permission_decorator_1.Perm)(exports.permissions.LIST),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_dto_1.RoleQueryDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '获取角色信息' }),
    (0, api_result_decorator_1.ApiResult)({ type: role_model_1.RoleInfo }),
    (0, permission_decorator_1.Perm)(exports.permissions.READ),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, id_param_decorator_1.IdParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "info", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '新增角色' }),
    (0, permission_decorator_1.Perm)(exports.permissions.CREATE),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_dto_1.RoleDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '更新角色' }),
    (0, permission_decorator_1.Perm)(exports.permissions.UPDATE),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, id_param_decorator_1.IdParam)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, role_dto_1.RoleUpdateDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '删除角色' }),
    (0, permission_decorator_1.Perm)(exports.permissions.DELETE),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, id_param_decorator_1.IdParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "delete", null);
exports.RoleController = RoleController = __decorate([
    (0, swagger_1.ApiTags)('System - 角色模块'),
    (0, swagger_decorator_1.ApiSecurityAuth)(),
    (0, common_1.Controller)('roles'),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => sse_service_1.SseService))),
    __metadata("design:paramtypes", [role_service_1.RoleService,
        menu_service_1.MenuService,
        sse_service_1.SseService])
], RoleController);
//# sourceMappingURL=role.controller.js.map