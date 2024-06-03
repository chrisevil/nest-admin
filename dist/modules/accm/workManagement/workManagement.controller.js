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
exports.WorkManagementController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_result_decorator_1 = require("../../../common/decorators/api-result.decorator");
const id_param_decorator_1 = require("../../../common/decorators/id-param.decorator");
const swagger_decorator_1 = require("../../../common/decorators/swagger.decorator");
const crud_factory_1 = require("../../../helper/crud/crud.factory");
const allow_anon_decorator_1 = require("../../auth/decorators/allow-anon.decorator");
const workManagement_dto_1 = require("./workManagement.dto");
const workManagement_entity_1 = require("./workManagement.entity");
const workManagement_service_1 = require("./workManagement.service");
const BaseWorkManagementController = (0, crud_factory_1.BaseCrudFactory)({
    entity: workManagement_entity_1.AccmWorkManagementEntity,
    dto: workManagement_dto_1.accmWorkManagementDto,
    permissions: {
        LIST: 'workManagement:list',
        CREATE: 'workManagement:create',
        READ: 'workManagement:read',
        UPDATE: 'workManagement:update',
        DELETE: 'workManagement:delete',
    },
});
let WorkManagementController = class WorkManagementController extends BaseWorkManagementController {
    workManagementService;
    constructor(workManagementService) {
        super(workManagementService);
        this.workManagementService = workManagementService;
    }
    async calendar(userId) {
        return {
            console: `this.workManagementService.calendar(${userId})`,
        };
    }
    async week(dto) {
        return this.workManagementService.week(dto);
    }
    async important(userId) {
        return {
            console: `this.workManagementService.important(${userId})`,
        };
    }
};
exports.WorkManagementController = WorkManagementController;
__decorate([
    (0, common_1.Get)(':userId/calendar'),
    (0, swagger_1.ApiOperation)({ summary: '获取个人工作安排日历' }),
    (0, api_result_decorator_1.ApiResult)({ type: [workManagement_entity_1.AccmWorkManagementEntity] }),
    (0, allow_anon_decorator_1.AllowAnon)(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, id_param_decorator_1.IdParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WorkManagementController.prototype, "calendar", null);
__decorate([
    (0, common_1.Get)(':userId/week'),
    (0, swagger_1.ApiOperation)({ summary: '根据时间段获取个人工作安排' }),
    (0, api_result_decorator_1.ApiResult)({ type: [workManagement_entity_1.AccmWorkManagementEntity] }),
    (0, allow_anon_decorator_1.AllowAnon)(),
    openapi.ApiResponse({ status: 200, type: [require("./workManagement.entity").AccmWorkManagementEntity] }),
    __param(0, (0, id_param_decorator_1.IdParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [workManagement_dto_1.accmWorkManagementQueryDto]),
    __metadata("design:returntype", Promise)
], WorkManagementController.prototype, "week", null);
__decorate([
    (0, common_1.Get)(':userId/important'),
    (0, swagger_1.ApiOperation)({ summary: '获取个人重要工作' }),
    (0, api_result_decorator_1.ApiResult)({ type: [workManagement_entity_1.AccmWorkManagementEntity] }),
    (0, allow_anon_decorator_1.AllowAnon)(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, id_param_decorator_1.IdParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WorkManagementController.prototype, "important", null);
exports.WorkManagementController = WorkManagementController = __decorate([
    (0, swagger_decorator_1.ApiSecurityAuth)(),
    (0, swagger_1.ApiTags)('workManagement - 财务工作管理模块'),
    (0, common_1.Controller)('accm/workManagement'),
    __metadata("design:paramtypes", [workManagement_service_1.WorkManagementService])
], WorkManagementController);
//# sourceMappingURL=workManagement.controller.js.map