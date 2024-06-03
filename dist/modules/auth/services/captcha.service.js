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
exports.CaptchaService = void 0;
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
const common_1 = require("@nestjs/common");
const ioredis_1 = __importDefault(require("ioredis"));
const lodash_1 = require("lodash");
const biz_exception_1 = require("../../../common/exceptions/biz.exception");
const error_code_constant_1 = require("../../../constants/error-code.constant");
const genRedisKey_1 = require("../../../helper/genRedisKey");
const captcha_log_service_1 = require("../../system/log/services/captcha-log.service");
let CaptchaService = class CaptchaService {
    redis;
    captchaLogService;
    constructor(redis, captchaLogService) {
        this.redis = redis;
        this.captchaLogService = captchaLogService;
    }
    async checkImgCaptcha(id, code) {
        const result = await this.redis.get((0, genRedisKey_1.genCaptchaImgKey)(id));
        if ((0, lodash_1.isEmpty)(result) || code.toLowerCase() !== result.toLowerCase())
            throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.INVALID_VERIFICATION_CODE);
        await this.redis.del((0, genRedisKey_1.genCaptchaImgKey)(id));
    }
    async log(account, code, provider, uid) {
        await this.captchaLogService.create(account, code, provider, uid);
    }
};
exports.CaptchaService = CaptchaService;
exports.CaptchaService = CaptchaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_redis_1.InjectRedis)()),
    __metadata("design:paramtypes", [ioredis_1.default,
        captcha_log_service_1.CaptchaLogService])
], CaptchaService);
//# sourceMappingURL=captcha.service.js.map