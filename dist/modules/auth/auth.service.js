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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
const common_1 = require("@nestjs/common");
const ioredis_1 = __importDefault(require("ioredis"));
const lodash_1 = require("lodash");
const biz_exception_1 = require("../../common/exceptions/biz.exception");
const config_1 = require("../../config");
const error_code_constant_1 = require("../../constants/error-code.constant");
const genRedisKey_1 = require("../../helper/genRedisKey");
const user_service_1 = require("../user/user.service");
const utils_1 = require("../../utils");
const login_log_service_1 = require("../system/log/services/login-log.service");
const menu_service_1 = require("../system/menu/menu.service");
const role_service_1 = require("../system/role/role.service");
const token_service_1 = require("./services/token.service");
let AuthService = class AuthService {
    redis;
    menuService;
    roleService;
    userService;
    loginLogService;
    tokenService;
    securityConfig;
    appConfig;
    constructor(redis, menuService, roleService, userService, loginLogService, tokenService, securityConfig, appConfig) {
        this.redis = redis;
        this.menuService = menuService;
        this.roleService = roleService;
        this.userService = userService;
        this.loginLogService = loginLogService;
        this.tokenService = tokenService;
        this.securityConfig = securityConfig;
        this.appConfig = appConfig;
    }
    async validateUser(credential, password) {
        const user = await this.userService.findUserByUserName(credential);
        if ((0, lodash_1.isEmpty)(user))
            throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.USER_NOT_FOUND);
        const comparePassword = (0, utils_1.md5)(`${password}${user.psalt}`);
        if (user.password !== comparePassword)
            throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.INVALID_USERNAME_PASSWORD);
        if (user) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async login(username, password, ip, ua) {
        const user = await this.userService.findUserByUserName(username);
        if ((0, lodash_1.isEmpty)(user))
            throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.INVALID_USERNAME_PASSWORD);
        const comparePassword = (0, utils_1.md5)(`${password}${user.psalt}`);
        if (user.password !== comparePassword)
            throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.INVALID_USERNAME_PASSWORD);
        const roleIds = await this.roleService.getRoleIdsByUser(user.id);
        const roles = await this.roleService.getRoleValues(roleIds);
        const token = await this.tokenService.generateAccessToken(user.id, roles);
        await this.redis.set((0, genRedisKey_1.genAuthTokenKey)(user.id), token.accessToken, 'EX', this.securityConfig.jwtExprire);
        await this.redis.set((0, genRedisKey_1.genAuthPVKey)(user.id), 1);
        const permissions = await this.menuService.getPermissions(user.id);
        await this.setPermissionsCache(user.id, permissions);
        await this.loginLogService.create(user.id, ip, ua);
        return token.accessToken;
    }
    async checkPassword(username, password) {
        const user = await this.userService.findUserByUserName(username);
        const comparePassword = (0, utils_1.md5)(`${password}${user.psalt}`);
        if (user.password !== comparePassword)
            throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.INVALID_USERNAME_PASSWORD);
    }
    async loginLog(uid, ip, ua) {
        await this.loginLogService.create(uid, ip, ua);
    }
    async resetPassword(username, password) {
        const user = await this.userService.findUserByUserName(username);
        await this.userService.forceUpdatePassword(user.id, password);
    }
    async clearLoginStatus(user, accessToken) {
        const exp = user.exp ? (user.exp - Date.now() / 1000).toFixed(0) : this.securityConfig.jwtExprire;
        await this.redis.set((0, genRedisKey_1.genTokenBlacklistKey)(accessToken), accessToken, 'EX', exp);
        if (this.appConfig.multiDeviceLogin)
            await this.tokenService.removeAccessToken(accessToken);
        else
            await this.userService.forbidden(user.uid, accessToken);
    }
    async getMenus(uid) {
        return this.menuService.getMenus(uid);
    }
    async getPermissions(uid) {
        return this.menuService.getPermissions(uid);
    }
    async getPermissionsCache(uid) {
        const permissionString = await this.redis.get((0, genRedisKey_1.genAuthPermKey)(uid));
        return permissionString ? JSON.parse(permissionString) : [];
    }
    async setPermissionsCache(uid, permissions) {
        await this.redis.set((0, genRedisKey_1.genAuthPermKey)(uid), JSON.stringify(permissions));
    }
    async getPasswordVersionByUid(uid) {
        return this.redis.get((0, genRedisKey_1.genAuthPVKey)(uid));
    }
    async getTokenByUid(uid) {
        return this.redis.get((0, genRedisKey_1.genAuthTokenKey)(uid));
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_redis_1.InjectRedis)()),
    __param(6, (0, common_1.Inject)(config_1.SecurityConfig.KEY)),
    __param(7, (0, common_1.Inject)(config_1.AppConfig.KEY)),
    __metadata("design:paramtypes", [ioredis_1.default,
        menu_service_1.MenuService,
        role_service_1.RoleService,
        user_service_1.UserService,
        login_log_service_1.LoginLogService,
        token_service_1.TokenService, Object, Object])
], AuthService);
//# sourceMappingURL=auth.service.js.map