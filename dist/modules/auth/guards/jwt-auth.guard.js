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
exports.JwtAuthGuard = void 0;
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const passport_1 = require("@nestjs/passport");
const ioredis_1 = __importDefault(require("ioredis"));
const lodash_1 = require("lodash");
const passport_jwt_1 = require("passport-jwt");
const biz_exception_1 = require("../../../common/exceptions/biz.exception");
const config_1 = require("../../../config");
const error_code_constant_1 = require("../../../constants/error-code.constant");
const genRedisKey_1 = require("../../../helper/genRedisKey");
const auth_service_1 = require("../auth.service");
const utils_1 = require("../../../utils");
const auth_constant_1 = require("../auth.constant");
const token_service_1 = require("../services/token.service");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)(auth_constant_1.AuthStrategy.JWT) {
    reflector;
    authService;
    tokenService;
    redis;
    appConfig;
    jwtFromRequestFn = passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken();
    constructor(reflector, authService, tokenService, redis, appConfig) {
        super();
        this.reflector = reflector;
        this.authService = authService;
        this.tokenService = tokenService;
        this.redis = redis;
        this.appConfig = appConfig;
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(auth_constant_1.PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const request = context.switchToHttp().getRequest();
        if (request.method !== 'GET' && !request.url.includes('/auth/login'))
            (0, utils_1.checkIsDemoMode)();
        const isSse = request.headers.accept === 'text/event-stream';
        if (isSse && !request.headers.authorization?.startsWith('Bearer ')) {
            const { token } = request.query;
            if (token)
                request.headers.authorization = `Bearer ${token}`;
        }
        const token = this.jwtFromRequestFn(request);
        if (await this.redis.get((0, genRedisKey_1.genTokenBlacklistKey)(token)))
            throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.INVALID_LOGIN);
        request.accessToken = token;
        let result = false;
        try {
            result = await super.canActivate(context);
        }
        catch (err) {
            if (isPublic)
                return true;
            if ((0, lodash_1.isEmpty)(token))
                throw new common_1.UnauthorizedException('未登录');
            if (err instanceof common_1.UnauthorizedException)
                throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.INVALID_LOGIN);
            const isValid = (0, lodash_1.isNil)(token)
                ? undefined
                : await this.tokenService.checkAccessToken(token);
            if (!isValid)
                throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.INVALID_LOGIN);
        }
        if (isSse) {
            const { uid } = request.params;
            if (Number(uid) !== request.user.uid)
                throw new common_1.UnauthorizedException('路径参数 uid 与当前 token 登录的用户 uid 不一致');
        }
        const pv = await this.authService.getPasswordVersionByUid(request.user.uid);
        if (pv !== `${request.user.pv}`) {
            throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.INVALID_LOGIN);
        }
        if (!this.appConfig.multiDeviceLogin) {
            const cacheToken = await this.authService.getTokenByUid(request.user.uid);
            if (token !== cacheToken) {
                throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.ACCOUNT_LOGGED_IN_ELSEWHERE);
            }
        }
        return result;
    }
    handleRequest(err, user, info) {
        if (err || !user)
            throw err || new common_1.UnauthorizedException();
        return user;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, nestjs_redis_1.InjectRedis)()),
    __param(4, (0, common_1.Inject)(config_1.AppConfig.KEY)),
    __metadata("design:paramtypes", [core_1.Reflector,
        auth_service_1.AuthService,
        token_service_1.TokenService,
        ioredis_1.default, Object])
], JwtAuthGuard);
//# sourceMappingURL=jwt-auth.guard.js.map