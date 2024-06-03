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
exports.UserController = exports.permissions = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_result_decorator_1 = require("../../common/decorators/api-result.decorator");
const id_param_decorator_1 = require("../../common/decorators/id-param.decorator");
const swagger_decorator_1 = require("../../common/decorators/swagger.decorator");
const menu_service_1 = require("../system/menu/menu.service");
const permission_decorator_1 = require("../auth/decorators/permission.decorator");
const password_dto_1 = require("./dto/password.dto");
const user_dto_1 = require("./dto/user.dto");
const user_entity_1 = require("./user.entity");
const user_service_1 = require("./user.service");
exports.permissions = (0, permission_decorator_1.definePermission)('system:user', {
    LIST: 'list',
    CREATE: 'create',
    READ: 'read',
    UPDATE: 'update',
    DELETE: 'delete',
    PASSWORD_UPDATE: 'password:update',
    PASSWORD_RESET: 'pass:reset',
});
let UserController = class UserController {
    userService;
    menuService;
    constructor(userService, menuService) {
        this.userService = userService;
        this.menuService = menuService;
    }
    async list(dto) {
        return this.userService.list(dto);
    }
    async read(id) {
        return this.userService.info(id);
    }
    async create(dto) {
        await this.userService.create(dto);
    }
    async update(id, dto) {
        await this.userService.update(id, dto);
        await this.menuService.refreshPerms(id);
    }
    async delete(ids) {
        await this.userService.delete(ids);
        await this.userService.multiForbidden(ids);
    }
    async password(id, dto) {
        await this.userService.forceUpdatePassword(id, dto.password);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '获取用户列表' }),
    (0, api_result_decorator_1.ApiResult)({ type: [user_entity_1.UserEntity], isPage: true }),
    (0, permission_decorator_1.Perm)(exports.permissions.LIST),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserQueryDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '查询用户' }),
    (0, permission_decorator_1.Perm)(exports.permissions.READ),
    openapi.ApiResponse({ status: 200, type: require("./user.entity").UserEntity }),
    __param(0, (0, id_param_decorator_1.IdParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "read", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '新增用户' }),
    (0, permission_decorator_1.Perm)(exports.permissions.CREATE),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '更新用户' }),
    (0, permission_decorator_1.Perm)(exports.permissions.UPDATE),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, id_param_decorator_1.IdParam)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_dto_1.UserUpdateDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '删除用户' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, schema: { oneOf: [{ type: 'string' }, { type: 'number' }] } }),
    (0, permission_decorator_1.Perm)(exports.permissions.DELETE),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseArrayPipe({ items: Number, separator: ',' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)(':id/password'),
    (0, swagger_1.ApiOperation)({ summary: '更改用户密码' }),
    (0, permission_decorator_1.Perm)(exports.permissions.PASSWORD_UPDATE),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, id_param_decorator_1.IdParam)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, password_dto_1.UserPasswordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "password", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('System - 用户模块'),
    (0, swagger_decorator_1.ApiSecurityAuth)(),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        menu_service_1.MenuService])
], UserController);
//# sourceMappingURL=user.controller.js.map