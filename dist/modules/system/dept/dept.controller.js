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
exports.DeptController = exports.permissions = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_result_decorator_1 = require("../../../common/decorators/api-result.decorator");
const id_param_decorator_1 = require("../../../common/decorators/id-param.decorator");
const swagger_decorator_1 = require("../../../common/decorators/swagger.decorator");
const biz_exception_1 = require("../../../common/exceptions/biz.exception");
const error_code_constant_1 = require("../../../constants/error-code.constant");
const auth_user_decorator_1 = require("../../auth/decorators/auth-user.decorator");
const permission_decorator_1 = require("../../auth/decorators/permission.decorator");
const dept_entity_1 = require("./dept.entity");
const dept_dto_1 = require("./dept.dto");
const dept_service_1 = require("./dept.service");
exports.permissions = (0, permission_decorator_1.definePermission)('system:dept', {
    LIST: 'list',
    CREATE: 'create',
    READ: 'read',
    UPDATE: 'update',
    DELETE: 'delete',
});
let DeptController = class DeptController {
    deptService;
    constructor(deptService) {
        this.deptService = deptService;
    }
    async list(dto, uid) {
        return this.deptService.getDeptTree(uid, dto);
    }
    async create(dto) {
        await this.deptService.create(dto);
    }
    async info(id) {
        return this.deptService.info(id);
    }
    async update(id, updateDeptDto) {
        await this.deptService.update(id, updateDeptDto);
    }
    async delete(id) {
        const count = await this.deptService.countUserByDeptId(id);
        if (count > 0)
            throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.DEPARTMENT_HAS_ASSOCIATED_USERS);
        const count2 = await this.deptService.countChildDept(id);
        console.log('count2', count2);
        if (count2 > 0)
            throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.DEPARTMENT_HAS_CHILD_DEPARTMENTS);
        await this.deptService.delete(id);
    }
};
exports.DeptController = DeptController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '获取部门列表' }),
    (0, api_result_decorator_1.ApiResult)({ type: [dept_entity_1.DeptEntity] }),
    (0, permission_decorator_1.Perm)(exports.permissions.LIST),
    openapi.ApiResponse({ status: 200, type: [require("./dept.entity").DeptEntity] }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, auth_user_decorator_1.AuthUser)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dept_dto_1.DeptQueryDto, Number]),
    __metadata("design:returntype", Promise)
], DeptController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '创建部门' }),
    (0, permission_decorator_1.Perm)(exports.permissions.CREATE),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dept_dto_1.DeptDto]),
    __metadata("design:returntype", Promise)
], DeptController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '查询部门信息' }),
    (0, permission_decorator_1.Perm)(exports.permissions.READ),
    openapi.ApiResponse({ status: 200, type: require("./dept.entity").DeptEntity }),
    __param(0, (0, id_param_decorator_1.IdParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DeptController.prototype, "info", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '更新部门' }),
    (0, permission_decorator_1.Perm)(exports.permissions.UPDATE),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, id_param_decorator_1.IdParam)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dept_dto_1.DeptDto]),
    __metadata("design:returntype", Promise)
], DeptController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '删除部门' }),
    (0, permission_decorator_1.Perm)(exports.permissions.DELETE),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, id_param_decorator_1.IdParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DeptController.prototype, "delete", null);
exports.DeptController = DeptController = __decorate([
    (0, swagger_decorator_1.ApiSecurityAuth)(),
    (0, swagger_1.ApiTags)('System - 部门模块'),
    (0, common_1.Controller)('depts'),
    __metadata("design:paramtypes", [dept_service_1.DeptService])
], DeptController);
//# sourceMappingURL=dept.controller.js.map