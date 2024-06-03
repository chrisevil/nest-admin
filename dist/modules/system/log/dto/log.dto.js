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
exports.CaptchaLogQueryDto = exports.TaskLogQueryDto = exports.LoginLogQueryDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const pager_dto_1 = require("../../../../common/dto/pager.dto");
class LoginLogQueryDto extends pager_dto_1.PagerDto {
    username;
    ip;
    address;
    time;
    static _OPENAPI_METADATA_FACTORY() {
        return { username: { required: true, type: () => String }, ip: { required: false, type: () => String }, address: { required: false, type: () => String }, time: { required: false, type: () => [String] } };
    }
}
exports.LoginLogQueryDto = LoginLogQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '用户名' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoginLogQueryDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '登录IP' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginLogQueryDto.prototype, "ip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '登录地点' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginLogQueryDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '登录时间' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], LoginLogQueryDto.prototype, "time", void 0);
class TaskLogQueryDto extends pager_dto_1.PagerDto {
    username;
    ip;
    time;
    static _OPENAPI_METADATA_FACTORY() {
        return { username: { required: true, type: () => String }, ip: { required: false, type: () => String }, time: { required: false, type: () => [String] } };
    }
}
exports.TaskLogQueryDto = TaskLogQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '用户名' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaskLogQueryDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '登录IP' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TaskLogQueryDto.prototype, "ip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '登录时间' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], TaskLogQueryDto.prototype, "time", void 0);
class CaptchaLogQueryDto extends pager_dto_1.PagerDto {
    username;
    code;
    time;
    static _OPENAPI_METADATA_FACTORY() {
        return { username: { required: true, type: () => String }, code: { required: false, type: () => String }, time: { required: false, type: () => [String] } };
    }
}
exports.CaptchaLogQueryDto = CaptchaLogQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '用户名' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CaptchaLogQueryDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '验证码' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CaptchaLogQueryDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '发送时间' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CaptchaLogQueryDto.prototype, "time", void 0);
//# sourceMappingURL=log.dto.js.map