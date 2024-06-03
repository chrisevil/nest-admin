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
exports.TokenService = void 0;
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const dayjs_1 = __importDefault(require("dayjs"));
const ioredis_1 = __importDefault(require("ioredis"));
const config_1 = require("../../../config");
const genRedisKey_1 = require("../../../helper/genRedisKey");
const role_service_1 = require("../../system/role/role.service");
const utils_1 = require("../../../utils");
const access_token_entity_1 = require("../entities/access-token.entity");
const refresh_token_entity_1 = require("../entities/refresh-token.entity");
let TokenService = class TokenService {
    jwtService;
    roleService;
    redis;
    securityConfig;
    constructor(jwtService, roleService, redis, securityConfig) {
        this.jwtService = jwtService;
        this.roleService = roleService;
        this.redis = redis;
        this.securityConfig = securityConfig;
    }
    async refreshToken(accessToken) {
        const { user, refreshToken } = accessToken;
        if (refreshToken) {
            const now = (0, dayjs_1.default)();
            if (now.isAfter(refreshToken.expired_at))
                return null;
            const roleIds = await this.roleService.getRoleIdsByUser(user.id);
            const roleValues = await this.roleService.getRoleValues(roleIds);
            const token = await this.generateAccessToken(user.id, roleValues);
            await accessToken.remove();
            return token;
        }
        return null;
    }
    generateJwtSign(payload) {
        const jwtSign = this.jwtService.sign(payload);
        return jwtSign;
    }
    async generateAccessToken(uid, roles = []) {
        const payload = {
            uid,
            pv: 1,
            roles,
        };
        const jwtSign = await this.jwtService.signAsync(payload);
        const accessToken = new access_token_entity_1.AccessTokenEntity();
        accessToken.value = jwtSign;
        accessToken.user = { id: uid };
        accessToken.expired_at = (0, dayjs_1.default)()
            .add(this.securityConfig.jwtExprire, 'second')
            .toDate();
        await accessToken.save();
        const refreshToken = await this.generateRefreshToken(accessToken, (0, dayjs_1.default)());
        return {
            accessToken: jwtSign,
            refreshToken,
        };
    }
    async generateRefreshToken(accessToken, now) {
        const refreshTokenPayload = {
            uuid: (0, utils_1.generateUUID)(),
        };
        const refreshTokenSign = await this.jwtService.signAsync(refreshTokenPayload, {
            secret: this.securityConfig.refreshSecret,
        });
        const refreshToken = new refresh_token_entity_1.RefreshTokenEntity();
        refreshToken.value = refreshTokenSign;
        refreshToken.expired_at = now
            .add(this.securityConfig.refreshExpire, 'second')
            .toDate();
        refreshToken.accessToken = accessToken;
        await refreshToken.save();
        return refreshTokenSign;
    }
    async checkAccessToken(value) {
        let isValid = false;
        try {
            await this.verifyAccessToken(value);
            const res = await access_token_entity_1.AccessTokenEntity.findOne({
                where: { value },
                relations: ['user', 'refreshToken'],
                cache: true,
            });
            isValid = Boolean(res);
        }
        catch (error) { }
        return isValid;
    }
    async removeAccessToken(value) {
        const accessToken = await access_token_entity_1.AccessTokenEntity.findOne({
            where: { value },
        });
        if (accessToken) {
            this.redis.del((0, genRedisKey_1.genOnlineUserKey)(accessToken.id));
            await accessToken.remove();
        }
    }
    async removeRefreshToken(value) {
        const refreshToken = await refresh_token_entity_1.RefreshTokenEntity.findOne({
            where: { value },
            relations: ['accessToken'],
        });
        if (refreshToken) {
            if (refreshToken.accessToken)
                this.redis.del((0, genRedisKey_1.genOnlineUserKey)(refreshToken.accessToken.id));
            await refreshToken.accessToken.remove();
            await refreshToken.remove();
        }
    }
    async verifyAccessToken(token) {
        return this.jwtService.verifyAsync(token);
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, nestjs_redis_1.InjectRedis)()),
    __param(3, (0, common_1.Inject)(config_1.SecurityConfig.KEY)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        role_service_1.RoleService,
        ioredis_1.default, Object])
], TokenService);
//# sourceMappingURL=token.service.js.map