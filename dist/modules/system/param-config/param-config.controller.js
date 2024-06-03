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
exports.ParamConfigController = exports.permissions = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_result_decorator_1 = require("../../../common/decorators/api-result.decorator");
const id_param_decorator_1 = require("../../../common/decorators/id-param.decorator");
const swagger_decorator_1 = require("../../../common/decorators/swagger.decorator");
const permission_decorator_1 = require("../../auth/decorators/permission.decorator");
const param_config_entity_1 = require("./param-config.entity");
const param_config_dto_1 = require("./param-config.dto");
const param_config_service_1 = require("./param-config.service");
exports.permissions = (0, permission_decorator_1.definePermission)('system:param-config', {
    LIST: 'list',
    CREATE: 'create',
    READ: 'read',
    UPDATE: 'update',
    DELETE: 'delete',
});
let ParamConfigController = class ParamConfigController {
    paramConfigService;
    constructor(paramConfigService) {
        this.paramConfigService = paramConfigService;
    }
    async list(dto) {
        return this.paramConfigService.page(dto);
    }
    async create(dto) {
        await this.paramConfigService.isExistKey(dto.key);
        await this.paramConfigService.create(dto);
    }
    async info(id) {
        return this.paramConfigService.findOne(id);
    }
    async update(id, dto) {
        await this.paramConfigService.update(id, dto);
    }
    async delete(id) {
        await this.paramConfigService.delete(id);
    }
};
exports.ParamConfigController = ParamConfigController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '获取参数配置列表' }),
    (0, api_result_decorator_1.ApiResult)({ type: [param_config_entity_1.ParamConfigEntity], isPage: true }),
    (0, permission_decorator_1.Perm)(exports.permissions.LIST),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [param_config_dto_1.ParamConfigQueryDto]),
    __metadata("design:returntype", Promise)
], ParamConfigController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '新增参数配置' }),
    (0, permission_decorator_1.Perm)(exports.permissions.CREATE),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [param_config_dto_1.ParamConfigDto]),
    __metadata("design:returntype", Promise)
], ParamConfigController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '查询参数配置信息' }),
    (0, api_result_decorator_1.ApiResult)({ type: param_config_entity_1.ParamConfigEntity }),
    (0, permission_decorator_1.Perm)(exports.permissions.READ),
    openapi.ApiResponse({ status: 200, type: require("./param-config.entity").ParamConfigEntity }),
    __param(0, (0, id_param_decorator_1.IdParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ParamConfigController.prototype, "info", null);
__decorate([
    (0, common_1.Post)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '更新参数配置' }),
    (0, permission_decorator_1.Perm)(exports.permissions.UPDATE),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, id_param_decorator_1.IdParam)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, param_config_dto_1.ParamConfigDto]),
    __metadata("design:returntype", Promise)
], ParamConfigController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '删除指定的参数配置' }),
    (0, permission_decorator_1.Perm)(exports.permissions.DELETE),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, id_param_decorator_1.IdParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ParamConfigController.prototype, "delete", null);
exports.ParamConfigController = ParamConfigController = __decorate([
    (0, swagger_1.ApiTags)('System - 参数配置模块'),
    (0, swagger_decorator_1.ApiSecurityAuth)(),
    (0, common_1.Controller)('param-config'),
    __metadata("design:paramtypes", [param_config_service_1.ParamConfigService])
], ParamConfigController);
//# sourceMappingURL=param-config.controller.js.map