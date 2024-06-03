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
exports.AccountController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_result_decorator_1 = require("../../../common/decorators/api-result.decorator");
const swagger_decorator_1 = require("../../../common/decorators/swagger.decorator");
const allow_anon_decorator_1 = require("../decorators/allow-anon.decorator");
const auth_user_decorator_1 = require("../decorators/auth-user.decorator");
const password_dto_1 = require("../../user/dto/password.dto");
const user_model_1 = require("../../user/user.model");
const user_service_1 = require("../../user/user.service");
const auth_service_1 = require("../auth.service");
const account_dto_1 = require("../dto/account.dto");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
let AccountController = class AccountController {
    userService;
    authService;
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    async profile(user) {
        return this.userService.getAccountInfo(user.uid);
    }
    async logout(user, req) {
        await this.authService.clearLoginStatus(user, req.accessToken);
    }
    async menu(user) {
        return this.authService.getMenus(user.uid);
    }
    async permissions(user) {
        return this.authService.getPermissions(user.uid);
    }
    async update(user, dto) {
        await this.userService.updateAccountInfo(user.uid, dto);
    }
    async password(user, dto) {
        await this.userService.updatePassword(user.uid, dto);
    }
};
exports.AccountController = AccountController;
__decorate([
    (0, common_1.Get)('profile'),
    (0, swagger_1.ApiOperation)({ summary: '获取账户资料' }),
    (0, api_result_decorator_1.ApiResult)({ type: user_model_1.AccountInfo }),
    (0, allow_anon_decorator_1.AllowAnon)(),
    openapi.ApiResponse({ status: 200, type: require("../../user/user.model").AccountInfo }),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "profile", null);
__decorate([
    (0, common_1.Get)('logout'),
    (0, swagger_1.ApiOperation)({ summary: '账户登出' }),
    (0, allow_anon_decorator_1.AllowAnon)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('menus'),
    (0, swagger_1.ApiOperation)({ summary: '获取菜单列表' }),
    (0, api_result_decorator_1.ApiResult)({ type: [account_dto_1.AccountMenus] }),
    (0, allow_anon_decorator_1.AllowAnon)(),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "menu", null);
__decorate([
    (0, common_1.Get)('permissions'),
    (0, swagger_1.ApiOperation)({ summary: '获取权限列表' }),
    (0, api_result_decorator_1.ApiResult)({ type: [String] }),
    (0, allow_anon_decorator_1.AllowAnon)(),
    openapi.ApiResponse({ status: 200, type: [String] }),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "permissions", null);
__decorate([
    (0, common_1.Put)('update'),
    (0, swagger_1.ApiOperation)({ summary: '更改账户资料' }),
    (0, allow_anon_decorator_1.AllowAnon)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, account_dto_1.AccountUpdateDto]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('password'),
    (0, swagger_1.ApiOperation)({ summary: '更改账户密码' }),
    (0, allow_anon_decorator_1.AllowAnon)(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, password_dto_1.PasswordUpdateDto]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "password", null);
exports.AccountController = AccountController = __decorate([
    (0, swagger_1.ApiTags)('Account - 账户模块'),
    (0, swagger_decorator_1.ApiSecurityAuth)(),
    (0, swagger_1.ApiExtraModels)(user_model_1.AccountInfo),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('account'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService])
], AccountController);
//# sourceMappingURL=account.controller.js.map