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
exports.CheckCodeDto = exports.SendSmsCodeDto = exports.SendEmailCodeDto = exports.ImageCaptchaDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class ImageCaptchaDto {
    width = 100;
    height = 50;
    static _OPENAPI_METADATA_FACTORY() {
        return { width: { required: true, type: () => Number, default: 100 }, height: { required: true, type: () => Number, default: 50 } };
    }
}
exports.ImageCaptchaDto = ImageCaptchaDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        default: 100,
        description: '验证码宽度',
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ImageCaptchaDto.prototype, "width", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        default: 50,
        description: '验证码宽度',
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ImageCaptchaDto.prototype, "height", void 0);
class SendEmailCodeDto {
    email;
    static _OPENAPI_METADATA_FACTORY() {
        return { email: { required: true, type: () => String } };
    }
}
exports.SendEmailCodeDto = SendEmailCodeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '邮箱' }),
    (0, class_validator_1.IsEmail)({}, { message: '邮箱格式不正确' }),
    __metadata("design:type", String)
], SendEmailCodeDto.prototype, "email", void 0);
class SendSmsCodeDto {
    phone;
    static _OPENAPI_METADATA_FACTORY() {
        return { phone: { required: true, type: () => String } };
    }
}
exports.SendSmsCodeDto = SendSmsCodeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '手机号' }),
    (0, class_validator_1.IsMobilePhone)('zh-CN', {}, { message: '手机号格式不正确' }),
    __metadata("design:type", String)
], SendSmsCodeDto.prototype, "phone", void 0);
class CheckCodeDto {
    account;
    code;
    static _OPENAPI_METADATA_FACTORY() {
        return { account: { required: true, type: () => String }, code: { required: true, type: () => String } };
    }
}
exports.CheckCodeDto = CheckCodeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '手机号/邮箱' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CheckCodeDto.prototype, "account", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '验证码' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CheckCodeDto.prototype, "code", void 0);
//# sourceMappingURL=captcha.dto.js.map