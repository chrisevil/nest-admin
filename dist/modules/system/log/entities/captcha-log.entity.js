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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaptchaLogEntity = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const common_entity_1 = require("../../../../common/entity/common.entity");
let CaptchaLogEntity = class CaptchaLogEntity extends common_entity_1.CommonEntity {
    userId;
    account;
    code;
    provider;
    static _OPENAPI_METADATA_FACTORY() {
        return { userId: { required: true, type: () => Number }, account: { required: true, type: () => String }, code: { required: true, type: () => String }, provider: { required: true, type: () => Object } };
    }
};
exports.CaptchaLogEntity = CaptchaLogEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', nullable: true }),
    (0, swagger_1.ApiProperty)({ description: '用户ID' }),
    __metadata("design:type", Number)
], CaptchaLogEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({ description: '账号' }),
    __metadata("design:type", String)
], CaptchaLogEntity.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({ description: '验证码' }),
    __metadata("design:type", String)
], CaptchaLogEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({ description: '验证码提供方' }),
    __metadata("design:type", String)
], CaptchaLogEntity.prototype, "provider", void 0);
exports.CaptchaLogEntity = CaptchaLogEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'sys_captcha_log' })
], CaptchaLogEntity);
//# sourceMappingURL=captcha-log.entity.js.map