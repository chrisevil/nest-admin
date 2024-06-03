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
exports.EmailController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const throttler_1 = require("@nestjs/throttler");
const http_decorator_1 = require("../../../common/decorators/http.decorator");
const mailer_service_1 = require("../../../shared/mailer/mailer.service");
const public_decorator_1 = require("../decorators/public.decorator");
const captcha_dto_1 = require("../dto/captcha.dto");
let EmailController = class EmailController {
    mailerService;
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendEmailCode(dto, ip) {
        const { email } = dto;
        await this.mailerService.checkLimit(email, ip);
        const { code } = await this.mailerService.sendVerificationCode(email);
        await this.mailerService.log(email, code, ip);
    }
};
exports.EmailController = EmailController;
__decorate([
    (0, common_1.Post)('send'),
    (0, swagger_1.ApiOperation)({ summary: '发送邮箱验证码' }),
    (0, public_decorator_1.Public)(),
    (0, throttler_1.Throttle)({ default: { limit: 2, ttl: 600000 } }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, http_decorator_1.Ip)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [captcha_dto_1.SendEmailCodeDto, String]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "sendEmailCode", null);
exports.EmailController = EmailController = __decorate([
    (0, swagger_1.ApiTags)('Auth - 认证模块'),
    (0, common_1.UseGuards)(throttler_1.ThrottlerGuard),
    (0, common_1.Controller)('auth/email'),
    __metadata("design:paramtypes", [mailer_service_1.MailerService])
], EmailController);
//# sourceMappingURL=email.controller.js.map