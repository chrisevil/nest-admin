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
exports.OnlineController = exports.permissions = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_result_decorator_1 = require("../../../common/decorators/api-result.decorator");
const swagger_decorator_1 = require("../../../common/decorators/swagger.decorator");
const auth_user_decorator_1 = require("../../auth/decorators/auth-user.decorator");
const permission_decorator_1 = require("../../auth/decorators/permission.decorator");
const online_dto_1 = require("./online.dto");
const online_model_1 = require("./online.model");
const online_service_1 = require("./online.service");
exports.permissions = (0, permission_decorator_1.definePermission)('system:online', ['list', 'kick']);
let OnlineController = class OnlineController {
    onlineService;
    constructor(onlineService) {
        this.onlineService = onlineService;
    }
    async list(req) {
        return this.onlineService.listOnlineUser(req.accessToken);
    }
    async kick(dto, user) {
        await this.onlineService.kickUser(dto.tokenId, user);
    }
};
exports.OnlineController = OnlineController;
__decorate([
    (0, common_1.Get)('list'),
    (0, swagger_1.ApiOperation)({ summary: '查询当前在线用户' }),
    (0, api_result_decorator_1.ApiResult)({ type: [online_model_1.OnlineUserInfo] }),
    (0, permission_decorator_1.Perm)(exports.permissions.LIST),
    openapi.ApiResponse({ status: 200, type: [require("./online.model").OnlineUserInfo] }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OnlineController.prototype, "list", null);
__decorate([
    (0, common_1.Post)('kick'),
    (0, swagger_1.ApiOperation)({ summary: '下线指定在线用户' }),
    (0, permission_decorator_1.Perm)(exports.permissions.KICK),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [online_dto_1.KickDto, Object]),
    __metadata("design:returntype", Promise)
], OnlineController.prototype, "kick", null);
exports.OnlineController = OnlineController = __decorate([
    (0, swagger_1.ApiTags)('System - 在线用户模块'),
    (0, swagger_decorator_1.ApiSecurityAuth)(),
    (0, swagger_1.ApiExtraModels)(online_model_1.OnlineUserInfo),
    (0, common_1.Controller)('online'),
    __metadata("design:paramtypes", [online_service_1.OnlineService])
], OnlineController);
//# sourceMappingURL=online.controller.js.map