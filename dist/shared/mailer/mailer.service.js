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
exports.MailerService = void 0;
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const dayjs_1 = __importDefault(require("dayjs"));
const ioredis_1 = __importDefault(require("ioredis"));
const biz_exception_1 = require("../../common/exceptions/biz.exception");
const config_1 = require("../../config");
const error_code_constant_1 = require("../../constants/error-code.constant");
const utils_1 = require("../../utils");
let MailerService = class MailerService {
    appConfig;
    redis;
    mailerService;
    constructor(appConfig, redis, mailerService) {
        this.appConfig = appConfig;
        this.redis = redis;
        this.mailerService = mailerService;
    }
    async log(to, code, ip) {
        const getRemainTime = () => {
            const now = (0, dayjs_1.default)();
            return now.endOf('day').diff(now, 'second');
        };
        await this.redis.set(`captcha:${to}`, code, 'EX', 60 * 5);
        const limitCountOfDay = await this.redis.get(`captcha:${to}:limit-day`);
        const ipLimitCountOfDay = await this.redis.get(`ip:${ip}:send:limit-day`);
        await this.redis.set(`ip:${ip}:send:limit`, 1, 'EX', 60);
        await this.redis.set(`captcha:${to}:limit`, 1, 'EX', 60);
        await this.redis.set(`captcha:${to}:send:limit-count-day`, limitCountOfDay, 'EX', getRemainTime());
        await this.redis.set(`ip:${ip}:send:limit-count-day`, ipLimitCountOfDay, 'EX', getRemainTime());
    }
    async checkCode(to, code) {
        const ret = await this.redis.get(`captcha:${to}`);
        if (ret !== code)
            throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.INVALID_VERIFICATION_CODE);
        await this.redis.del(`captcha:${to}`);
    }
    async checkLimit(to, ip) {
        const LIMIT_TIME = 5;
        const ipLimit = await this.redis.get(`ip:${ip}:send:limit`);
        if (ipLimit)
            throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.TOO_MANY_REQUESTS);
        const limit = await this.redis.get(`captcha:${to}:limit`);
        if (limit)
            throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.TOO_MANY_REQUESTS);
        let limitCountOfDay = await this.redis.get(`captcha:${to}:limit-day`);
        limitCountOfDay = limitCountOfDay ? Number(limitCountOfDay) : 0;
        if (limitCountOfDay > LIMIT_TIME) {
            throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.MAXIMUM_FIVE_VERIFICATION_CODES_PER_DAY);
        }
        let ipLimitCountOfDay = await this.redis.get(`ip:${ip}:send:limit-day`);
        ipLimitCountOfDay = ipLimitCountOfDay ? Number(ipLimitCountOfDay) : 0;
        if (ipLimitCountOfDay > LIMIT_TIME) {
            throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.MAXIMUM_FIVE_VERIFICATION_CODES_PER_DAY);
        }
    }
    async send(to, subject, content, type = 'text') {
        if (type === 'text') {
            return this.mailerService.sendMail({
                to,
                subject,
                text: content,
            });
        }
        else {
            return this.mailerService.sendMail({
                to,
                subject,
                html: content,
            });
        }
    }
    async sendVerificationCode(to, code = (0, utils_1.randomValue)(4, '1234567890')) {
        const subject = `[${this.appConfig.name}] 验证码`;
        try {
            await this.mailerService.sendMail({
                to,
                subject,
                template: './verification-code-zh',
                context: {
                    code,
                },
            });
        }
        catch (error) {
            console.log(error);
            throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.VERIFICATION_CODE_SEND_FAILED);
        }
        return {
            to,
            code,
        };
    }
};
exports.MailerService = MailerService;
exports.MailerService = MailerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(config_1.AppConfig.KEY)),
    __param(1, (0, nestjs_redis_1.InjectRedis)()),
    __metadata("design:paramtypes", [Object, ioredis_1.default,
        mailer_1.MailerService])
], MailerService);
//# sourceMappingURL=mailer.service.js.map