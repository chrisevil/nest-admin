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
exports.LogController = exports.permissions = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_result_decorator_1 = require("../../../common/decorators/api-result.decorator");
const swagger_decorator_1 = require("../../../common/decorators/swagger.decorator");
const permission_decorator_1 = require("../../auth/decorators/permission.decorator");
const log_dto_1 = require("./dto/log.dto");
const captcha_log_entity_1 = require("./entities/captcha-log.entity");
const task_log_entity_1 = require("./entities/task-log.entity");
const log_model_1 = require("./models/log.model");
const captcha_log_service_1 = require("./services/captcha-log.service");
const login_log_service_1 = require("./services/login-log.service");
const task_log_service_1 = require("./services/task-log.service");
exports.permissions = (0, permission_decorator_1.definePermission)('system:log', {
    TaskList: 'task:list',
    LogList: 'login:list',
    CaptchaList: 'captcha:list',
});
let LogController = class LogController {
    loginLogService;
    taskService;
    captchaLogService;
    constructor(loginLogService, taskService, captchaLogService) {
        this.loginLogService = loginLogService;
        this.taskService = taskService;
        this.captchaLogService = captchaLogService;
    }
    async loginLogPage(dto) {
        return this.loginLogService.list(dto);
    }
    async taskList(dto) {
        return this.taskService.list(dto);
    }
    async captchaList(dto) {
        return this.captchaLogService.paginate(dto);
    }
};
exports.LogController = LogController;
__decorate([
    (0, common_1.Get)('login/list'),
    (0, swagger_1.ApiOperation)({ summary: '查询登录日志列表' }),
    (0, api_result_decorator_1.ApiResult)({ type: [log_model_1.LoginLogInfo], isPage: true }),
    (0, permission_decorator_1.Perm)(exports.permissions.TaskList),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [log_dto_1.LoginLogQueryDto]),
    __metadata("design:returntype", Promise)
], LogController.prototype, "loginLogPage", null);
__decorate([
    (0, common_1.Get)('task/list'),
    (0, swagger_1.ApiOperation)({ summary: '查询任务日志列表' }),
    (0, api_result_decorator_1.ApiResult)({ type: [task_log_entity_1.TaskLogEntity], isPage: true }),
    (0, permission_decorator_1.Perm)(exports.permissions.LogList),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [log_dto_1.TaskLogQueryDto]),
    __metadata("design:returntype", Promise)
], LogController.prototype, "taskList", null);
__decorate([
    (0, common_1.Get)('captcha/list'),
    (0, swagger_1.ApiOperation)({ summary: '查询验证码日志列表' }),
    (0, api_result_decorator_1.ApiResult)({ type: [captcha_log_entity_1.CaptchaLogEntity], isPage: true }),
    (0, permission_decorator_1.Perm)(exports.permissions.CaptchaList),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [log_dto_1.CaptchaLogQueryDto]),
    __metadata("design:returntype", Promise)
], LogController.prototype, "captchaList", null);
exports.LogController = LogController = __decorate([
    (0, swagger_decorator_1.ApiSecurityAuth)(),
    (0, swagger_1.ApiTags)('System - 日志模块'),
    (0, common_1.Controller)('log'),
    __metadata("design:paramtypes", [login_log_service_1.LoginLogService,
        task_log_service_1.TaskLogService,
        captcha_log_service_1.CaptchaLogService])
], LogController);
//# sourceMappingURL=log.controller.js.map