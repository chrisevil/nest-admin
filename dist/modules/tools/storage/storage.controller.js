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
exports.StorageController = exports.permissions = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_result_decorator_1 = require("../../../common/decorators/api-result.decorator");
const swagger_decorator_1 = require("../../../common/decorators/swagger.decorator");
const permission_decorator_1 = require("../../auth/decorators/permission.decorator");
const storage_dto_1 = require("./storage.dto");
const storage_modal_1 = require("./storage.modal");
const storage_service_1 = require("./storage.service");
exports.permissions = (0, permission_decorator_1.definePermission)('tool:storage', {
    LIST: 'list',
    DELETE: 'delete',
});
let StorageController = class StorageController {
    storageService;
    constructor(storageService) {
        this.storageService = storageService;
    }
    async list(dto) {
        return this.storageService.list(dto);
    }
    async delete(dto) {
        await this.storageService.delete(dto.ids);
    }
};
exports.StorageController = StorageController;
__decorate([
    (0, common_1.Get)('list'),
    (0, swagger_1.ApiOperation)({ summary: '获取本地存储列表' }),
    (0, api_result_decorator_1.ApiResult)({ type: [storage_modal_1.StorageInfo], isPage: true }),
    (0, permission_decorator_1.Perm)(exports.permissions.LIST),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [storage_dto_1.StoragePageDto]),
    __metadata("design:returntype", Promise)
], StorageController.prototype, "list", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '删除文件' }),
    (0, common_1.Post)('delete'),
    (0, permission_decorator_1.Perm)(exports.permissions.DELETE),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [storage_dto_1.StorageDeleteDto]),
    __metadata("design:returntype", Promise)
], StorageController.prototype, "delete", null);
exports.StorageController = StorageController = __decorate([
    (0, swagger_1.ApiTags)('Tools - 存储模块'),
    (0, swagger_decorator_1.ApiSecurityAuth)(),
    (0, common_1.Controller)('storage'),
    __metadata("design:paramtypes", [storage_service_1.StorageService])
], StorageController);
//# sourceMappingURL=storage.controller.js.map