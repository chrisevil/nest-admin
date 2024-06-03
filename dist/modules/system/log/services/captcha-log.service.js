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
exports.CaptchaLogService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const paginate_1 = require("../../../../helper/paginate");
const captcha_log_entity_1 = require("../entities/captcha-log.entity");
let CaptchaLogService = class CaptchaLogService {
    captchaLogRepository;
    constructor(captchaLogRepository) {
        this.captchaLogRepository = captchaLogRepository;
    }
    async create(account, code, provider, uid) {
        await this.captchaLogRepository.save({
            account,
            code,
            provider,
            userId: uid,
        });
    }
    async paginate({ page, pageSize }) {
        const queryBuilder = await this.captchaLogRepository
            .createQueryBuilder('captcha_log')
            .orderBy('captcha_log.id', 'DESC');
        return (0, paginate_1.paginate)(queryBuilder, {
            page,
            pageSize,
        });
    }
    async clearLog() {
        await this.captchaLogRepository.clear();
    }
    async clearLogBeforeTime(time) {
        await this.captchaLogRepository.delete({ createdAt: (0, typeorm_2.LessThan)(time) });
    }
};
exports.CaptchaLogService = CaptchaLogService;
exports.CaptchaLogService = CaptchaLogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(captcha_log_entity_1.CaptchaLogEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CaptchaLogService);
//# sourceMappingURL=captcha-log.service.js.map