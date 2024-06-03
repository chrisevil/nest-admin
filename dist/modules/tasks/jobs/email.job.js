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
var EmailJob_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailJob = void 0;
const common_1 = require("@nestjs/common");
const logger_service_1 = require("../../../shared/logger/logger.service");
const mailer_service_1 = require("../../../shared/mailer/mailer.service");
const mission_decorator_1 = require("../mission.decorator");
let EmailJob = EmailJob_1 = class EmailJob {
    emailService;
    logger;
    constructor(emailService, logger) {
        this.emailService = emailService;
        this.logger = logger;
    }
    async send(config) {
        if (config) {
            const { to, subject, content } = config;
            const result = await this.emailService.send(to, subject, content);
            this.logger.log(result, EmailJob_1.name);
        }
        else {
            throw new common_1.BadRequestException('Email send job param is empty');
        }
    }
};
exports.EmailJob = EmailJob;
exports.EmailJob = EmailJob = EmailJob_1 = __decorate([
    (0, common_1.Injectable)(),
    (0, mission_decorator_1.Mission)(),
    __metadata("design:paramtypes", [mailer_service_1.MailerService,
        logger_service_1.LoggerService])
], EmailJob);
//# sourceMappingURL=email.job.js.map