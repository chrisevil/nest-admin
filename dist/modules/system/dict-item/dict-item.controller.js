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
exports.DictItemController = exports.permissions = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_result_decorator_1 = require("../../../common/decorators/api-result.decorator");
const id_param_decorator_1 = require("../../../common/decorators/id-param.decorator");
const swagger_decorator_1 = require("../../../common/decorators/swagger.decorator");
const auth_user_decorator_1 = require("../../auth/decorators/auth-user.decorator");
const permission_decorator_1 = require("../../auth/decorators/permission.decorator");
const dict_item_entity_1 = require("./dict-item.entity");
const dict_item_dto_1 = require("./dict-item.dto");
const dict_item_service_1 = require("./dict-item.service");
exports.permissions = (0, permission_decorator_1.definePermission)('system:dict-item', {
    LIST: 'list',
    CREATE: 'create',
    READ: 'read',
    UPDATE: 'update',
    DELETE: 'delete',
});
let DictItemController = class DictItemController {
    dictItemService;
    constructor(dictItemService) {
        this.dictItemService = dictItemService;
    }
    async list(dto) {
        return this.dictItemService.page(dto);
    }
    async create(dto, user) {
        await this.dictItemService.isExistKey(dto);
        dto.createBy = dto.updateBy = user.uid;
        await this.dictItemService.create(dto);
    }
    async info(id) {
        return this.dictItemService.findOne(id);
    }
    async update(id, dto, user) {
        dto.updateBy = user.uid;
        await this.dictItemService.update(id, dto);
    }
    async delete(id) {
        await this.dictItemService.delete(id);
    }
};
exports.DictItemController = DictItemController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '获取字典项列表' }),
    (0, api_result_decorator_1.ApiResult)({ type: [dict_item_entity_1.DictItemEntity], isPage: true }),
    (0, permission_decorator_1.Perm)(exports.permissions.LIST),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dict_item_dto_1.DictItemQueryDto]),
    __metadata("design:returntype", Promise)
], DictItemController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '新增字典项' }),
    (0, permission_decorator_1.Perm)(exports.permissions.CREATE),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dict_item_dto_1.DictItemDto, Object]),
    __metadata("design:returntype", Promise)
], DictItemController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '查询字典项信息' }),
    (0, api_result_decorator_1.ApiResult)({ type: dict_item_entity_1.DictItemEntity }),
    (0, permission_decorator_1.Perm)(exports.permissions.READ),
    openapi.ApiResponse({ status: 200, type: require("./dict-item.entity").DictItemEntity }),
    __param(0, (0, id_param_decorator_1.IdParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DictItemController.prototype, "info", null);
__decorate([
    (0, common_1.Post)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '更新字典项' }),
    (0, permission_decorator_1.Perm)(exports.permissions.UPDATE),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, id_param_decorator_1.IdParam)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dict_item_dto_1.DictItemDto, Object]),
    __metadata("design:returntype", Promise)
], DictItemController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '删除指定的字典项' }),
    (0, permission_decorator_1.Perm)(exports.permissions.DELETE),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, id_param_decorator_1.IdParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DictItemController.prototype, "delete", null);
exports.DictItemController = DictItemController = __decorate([
    (0, swagger_1.ApiTags)('System - 字典项模块'),
    (0, swagger_decorator_1.ApiSecurityAuth)(),
    (0, common_1.Controller)('dict-item'),
    __metadata("design:paramtypes", [dict_item_service_1.DictItemService])
], DictItemController);
//# sourceMappingURL=dict-item.controller.js.map