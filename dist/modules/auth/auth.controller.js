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
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_result_decorator_1 = require("../../common/decorators/api-result.decorator");
const http_decorator_1 = require("../../common/decorators/http.decorator");
const user_service_1 = require("../user/user.service");
const auth_service_1 = require("./auth.service");
const public_decorator_1 = require("./decorators/public.decorator");
const auth_dto_1 = require("./dto/auth.dto");
const local_guard_1 = require("./guards/local.guard");
const auth_model_1 = require("./models/auth.model");
const captcha_service_1 = require("./services/captcha.service");
let AuthController = class AuthController {
    authService;
    userService;
    captchaService;
    constructor(authService, userService, captchaService) {
        this.authService = authService;
        this.userService = userService;
        this.captchaService = captchaService;
    }
    async login(dto, ip, ua) {
        const token = await this.authService.login(dto.username, dto.password, ip, ua);
        return { token };
    }
    async register(dto) {
        await this.userService.register(dto);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: '登录' }),
    (0, api_result_decorator_1.ApiResult)({ type: auth_model_1.LoginToken }),
    openapi.ApiResponse({ status: 201, type: require("./models/auth.model").LoginToken }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, http_decorator_1.Ip)()),
    __param(2, (0, common_1.Headers)('user-agent')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginDto, String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: '注册' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth - 认证模块'),
    (0, common_1.UseGuards)(local_guard_1.LocalGuard),
    (0, public_decorator_1.Public)(),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService,
        captcha_service_1.CaptchaService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map