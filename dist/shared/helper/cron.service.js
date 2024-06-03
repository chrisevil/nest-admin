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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var CronService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const dayjs_1 = __importDefault(require("dayjs"));
const typeorm_1 = require("typeorm");
const cron_once_decorator_1 = require("../../common/decorators/cron-once.decorator");
const access_token_entity_1 = require("../../modules/auth/entities/access-token.entity");
let CronService = CronService_1 = class CronService {
    configService;
    logger = new common_1.Logger(CronService_1.name);
    constructor(configService) {
        this.configService = configService;
    }
    async deleteExpiredJWT() {
        this.logger.log('--> 开始扫表，清除过期的 token');
        const expiredTokens = await access_token_entity_1.AccessTokenEntity.find({
            where: {
                expired_at: (0, typeorm_1.LessThan)(new Date()),
            },
        });
        let deleteCount = 0;
        await Promise.all(expiredTokens.map(async (token) => {
            const { value, created_at } = token;
            await access_token_entity_1.AccessTokenEntity.remove(token);
            this.logger.debug(`--> 删除过期的 token：${value}, 签发于 ${(0, dayjs_1.default)(created_at).format('YYYY-MM-DD H:mm:ss')}`);
            deleteCount += 1;
        }));
        this.logger.log(`--> 删除了 ${deleteCount} 个过期的 token`);
    }
};
exports.CronService = CronService;
__decorate([
    (0, cron_once_decorator_1.CronOnce)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronService.prototype, "deleteExpiredJWT", null);
exports.CronService = CronService = CronService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CronService);
//# sourceMappingURL=cron.service.js.map