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
exports.DictTypeController = exports.permissions = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_result_decorator_1 = require("../../../common/decorators/api-result.decorator");
const id_param_decorator_1 = require("../../../common/decorators/id-param.decorator");
const swagger_decorator_1 = require("../../../common/decorators/swagger.decorator");
const auth_user_decorator_1 = require("../../auth/decorators/auth-user.decorator");
const permission_decorator_1 = require("../../auth/decorators/permission.decorator");
const dict_type_entity_1 = require("./dict-type.entity");
const dict_type_dto_1 = require("./dict-type.dto");
const dict_type_service_1 = require("./dict-type.service");
exports.permissions = (0, permission_decorator_1.definePermission)('system:dict-type', {
    LIST: 'list',
    CREATE: 'create',
    READ: 'read',
    UPDATE: 'update',
    DELETE: 'delete',
});
let DictTypeController = class DictTypeController {
    dictTypeService;
    constructor(dictTypeService) {
        this.dictTypeService = dictTypeService;
    }
    async list(dto) {
        return this.dictTypeService.page(dto);
    }
    async getAll() {
        return this.dictTypeService.getAll();
    }
    async create(dto, user) {
        await this.dictTypeService.isExistKey(dto.name);
        dto.createBy = dto.updateBy = user.uid;
        await this.dictTypeService.create(dto);
    }
    async info(id) {
        return this.dictTypeService.findOne(id);
    }
    async update(id, dto, user) {
        dto.updateBy = user.uid;
        await this.dictTypeService.update(id, dto);
    }
    async delete(id) {
        await this.dictTypeService.delete(id);
    }
};
exports.DictTypeController = DictTypeController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '获取字典类型列表' }),
    (0, api_result_decorator_1.ApiResult)({ type: [dict_type_entity_1.DictTypeEntity], isPage: true }),
    (0, permission_decorator_1.Perm)(exports.permissions.LIST),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dict_type_dto_1.DictTypeQueryDto]),
    __metadata("design:returntype", Promise)
], DictTypeController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('select-options'),
    (0, swagger_1.ApiOperation)({ summary: '一次性获取所有的字典类型(不分页)' }),
    (0, api_result_decorator_1.ApiResult)({ type: [dict_type_entity_1.DictTypeEntity] }),
    (0, permission_decorator_1.Perm)(exports.permissions.LIST),
    openapi.ApiResponse({ status: 200, type: [require("./dict-type.entity").DictTypeEntity] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DictTypeController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '新增字典类型' }),
    (0, permission_decorator_1.Perm)(exports.permissions.CREATE),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dict_type_dto_1.DictTypeDto, Object]),
    __metadata("design:returntype", Promise)
], DictTypeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '查询字典类型信息' }),
    (0, api_result_decorator_1.ApiResult)({ type: dict_type_entity_1.DictTypeEntity }),
    (0, permission_decorator_1.Perm)(exports.permissions.READ),
    openapi.ApiResponse({ status: 200, type: require("./dict-type.entity").DictTypeEntity }),
    __param(0, (0, id_param_decorator_1.IdParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DictTypeController.prototype, "info", null);
__decorate([
    (0, common_1.Post)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '更新字典类型' }),
    (0, permission_decorator_1.Perm)(exports.permissions.UPDATE),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, id_param_decorator_1.IdParam)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dict_type_dto_1.DictTypeDto, Object]),
    __metadata("design:returntype", Promise)
], DictTypeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '删除指定的字典类型' }),
    (0, permission_decorator_1.Perm)(exports.permissions.DELETE),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, id_param_decorator_1.IdParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DictTypeController.prototype, "delete", null);
exports.DictTypeController = DictTypeController = __decorate([
    (0, swagger_1.ApiTags)('System - 字典类型模块'),
    (0, swagger_decorator_1.ApiSecurityAuth)(),
    (0, common_1.Controller)('dict-type'),
    __metadata("design:paramtypes", [dict_type_service_1.DictTypeService])
], DictTypeController);
//# sourceMappingURL=dict-type.controller.js.map