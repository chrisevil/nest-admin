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
exports.OnlineService = void 0;
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
const common_1 = require("@nestjs/common");
const ioredis_1 = __importDefault(require("ioredis"));
const lodash_1 = require("lodash");
const ua_parser_js_1 = require("ua-parser-js");
const biz_exception_1 = require("../../../common/exceptions/biz.exception");
const error_code_constant_1 = require("../../../constants/error-code.constant");
const genRedisKey_1 = require("../../../helper/genRedisKey");
const auth_service_1 = require("../../auth/auth.service");
const access_token_entity_1 = require("../../auth/entities/access-token.entity");
const token_service_1 = require("../../auth/services/token.service");
const sse_service_1 = require("../../sse/sse.service");
const utils_1 = require("../../../utils");
const user_service_1 = require("../../user/user.service");
let OnlineService = class OnlineService {
    redis;
    userService;
    authService;
    tokenService;
    sseService;
    constructor(redis, userService, authService, tokenService, sseService) {
        this.redis = redis;
        this.userService = userService;
        this.authService = authService;
        this.tokenService = tokenService;
        this.sseService = sseService;
    }
    updateOnlineUserCount = (0, lodash_1.throttle)(async () => {
        const keys = await this.redis.keys((0, genRedisKey_1.genOnlineUserKey)('*'));
        this.sseService.sendToAllUser({ type: 'updateOnlineUserCount', data: keys.length });
    }, 3000);
    async addOnlineUser(value, ip, ua) {
        const token = await access_token_entity_1.AccessTokenEntity.findOne({
            where: { value },
            relations: {
                user: {
                    dept: true,
                },
            },
            cache: true,
        });
        if (!token)
            return;
        const tokenPaload = await this.tokenService.verifyAccessToken(value);
        const exp = ~~(tokenPaload.exp - Date.now() / 1000);
        const parser = new ua_parser_js_1.UAParser();
        const uaResult = parser.setUA(ua).getResult();
        const address = await (0, utils_1.getIpAddress)(ip);
        const result = {
            ip,
            address,
            tokenId: token.id,
            uid: token.user.id,
            deptName: token.user.dept.name,
            os: `${`${uaResult.os.name ?? ''} `}${uaResult.os.version}`,
            browser: `${`${uaResult.browser.name ?? ''} `}${uaResult.browser.version}`,
            username: token.user.username,
            time: token.created_at.toString(),
        };
        await this.redis.set((0, genRedisKey_1.genOnlineUserKey)(token.id), JSON.stringify(result), 'EX', exp);
        this.updateOnlineUserCount();
    }
    async removeOnlineUser(value) {
        const token = await access_token_entity_1.AccessTokenEntity.findOne({
            where: { value },
            relations: ['user'],
            cache: true,
        });
        await this.redis.del((0, genRedisKey_1.genOnlineUserKey)(token?.id));
        this.updateOnlineUserCount();
    }
    async clearOnlineUser() {
        const keys = await this.redis.keys((0, genRedisKey_1.genOnlineUserKey)('*'));
        await this.redis.del(keys);
    }
    async listOnlineUser(value) {
        const token = await access_token_entity_1.AccessTokenEntity.findOne({
            where: { value },
            relations: ['user'],
            cache: true,
        });
        const keys = await this.redis.keys((0, genRedisKey_1.genOnlineUserKey)('*'));
        const users = await this.redis.mget(keys);
        const rootUserId = await this.userService.findRootUserId();
        return users.map((e) => {
            const item = JSON.parse(e);
            item.isCurrent = token?.id === item.tokenId;
            item.disable = item.isCurrent || item.uid === rootUserId;
            return item;
        }).sort((a, b) => a.time > b.time ? -1 : 1);
    }
    async kickUser(tokenId, user) {
        const token = await access_token_entity_1.AccessTokenEntity.findOne({
            where: { id: tokenId },
            relations: ['user'],
            cache: true,
        });
        if (!token)
            return;
        const rootUserId = await this.userService.findRootUserId();
        const targetUid = token.user.id;
        if (targetUid === rootUserId || targetUid === user.uid)
            throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.NOT_ALLOWED_TO_LOGOUT_USER);
        const targetUser = await this.tokenService.verifyAccessToken(token.value);
        await this.authService.clearLoginStatus(targetUser, token.value);
    }
};
exports.OnlineService = OnlineService;
exports.OnlineService = OnlineService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_redis_1.InjectRedis)()),
    __metadata("design:paramtypes", [ioredis_1.default,
        user_service_1.UserService,
        auth_service_1.AuthService,
        token_service_1.TokenService,
        sse_service_1.SseService])
], OnlineService);
//# sourceMappingURL=online.service.js.map