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
exports.LoginLogService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ua_parser_js_1 = __importDefault(require("ua-parser-js"));
const paginate_1 = require("../../../../helper/paginate");
const ip_util_1 = require("../../../../utils/ip.util");
const login_log_entity_1 = require("../entities/login-log.entity");
async function parseLoginLog(e, parser) {
    const uaResult = parser.setUA(e.login_log_ua).getResult();
    return {
        id: e.login_log_id,
        ip: e.login_log_ip,
        address: e.login_log_address,
        os: `${`${uaResult.os.name ?? ''} `}${uaResult.os.version}`,
        browser: `${`${uaResult.browser.name ?? ''} `}${uaResult.browser.version}`,
        username: e.user_username,
        time: e.login_log_created_at,
    };
}
let LoginLogService = class LoginLogService {
    loginLogRepository;
    constructor(loginLogRepository) {
        this.loginLogRepository = loginLogRepository;
    }
    async create(uid, ip, ua) {
        try {
            const address = await (0, ip_util_1.getIpAddress)(ip);
            await this.loginLogRepository.save({
                ip,
                ua,
                address,
                user: { id: uid },
            });
        }
        catch (e) {
            console.error(e);
        }
    }
    async list({ page, pageSize, username, ip, address, time, }) {
        const queryBuilder = await this.loginLogRepository
            .createQueryBuilder('login_log')
            .innerJoinAndSelect('login_log.user', 'user')
            .where({
            ...(ip && { ip: (0, typeorm_2.Like)(`%${ip}%`) }),
            ...(address && { address: (0, typeorm_2.Like)(`%${address}%`) }),
            ...(time && { createdAt: (0, typeorm_2.Between)(time[0], time[1]) }),
            ...(username && {
                user: {
                    username: (0, typeorm_2.Like)(`%${username}%`),
                },
            }),
        })
            .orderBy('login_log.created_at', 'DESC');
        const { items, ...rest } = await (0, paginate_1.paginateRaw)(queryBuilder, {
            page,
            pageSize,
        });
        const parser = new ua_parser_js_1.default();
        const loginLogInfos = await Promise.all(items.map(item => parseLoginLog(item, parser)));
        return {
            items: loginLogInfos,
            ...rest,
        };
    }
    async clearLog() {
        await this.loginLogRepository.clear();
    }
    async clearLogBeforeTime(time) {
        await this.loginLogRepository.delete({ createdAt: (0, typeorm_2.LessThan)(time) });
    }
};
exports.LoginLogService = LoginLogService;
exports.LoginLogService = LoginLogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(login_log_entity_1.LoginLogEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LoginLogService);
//# sourceMappingURL=login-log.service.js.map