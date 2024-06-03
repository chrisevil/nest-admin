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
exports.UserExistDto = exports.UserPasswordDto = exports.PasswordUpdateDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class PasswordUpdateDto {
    oldPassword;
    newPassword;
    static _OPENAPI_METADATA_FACTORY() {
        return { oldPassword: { required: true, type: () => String, minLength: 6, maxLength: 20, pattern: "/^[a-z0-9A-Z\\W_]+$/" }, newPassword: { required: true, type: () => String, pattern: "/^\\S*(?=\\S{6,})(?=\\S*\\d)(?=\\S*[A-Za-z])\\S*$/" } };
    }
}
exports.PasswordUpdateDto = PasswordUpdateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '旧密码' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[a-z0-9A-Z\W_]+$/),
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], PasswordUpdateDto.prototype, "oldPassword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '新密码' }),
    (0, class_validator_1.Matches)(/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Za-z])\S*$/, {
        message: '密码必须包含数字、字母，长度为6-16',
    }),
    __metadata("design:type", String)
], PasswordUpdateDto.prototype, "newPassword", void 0);
class UserPasswordDto {
    password;
    static _OPENAPI_METADATA_FACTORY() {
        return { password: { required: true, type: () => String, pattern: "/^\\S*(?=\\S{6,})(?=\\S*\\d)(?=\\S*[A-Za-z])\\S*$/" } };
    }
}
exports.UserPasswordDto = UserPasswordDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '更改后的密码' }),
    (0, class_validator_1.Matches)(/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Za-z])\S*$/, {
        message: '密码格式不正确',
    }),
    __metadata("design:type", String)
], UserPasswordDto.prototype, "password", void 0);
class UserExistDto {
    username;
    static _OPENAPI_METADATA_FACTORY() {
        return { username: { required: true, type: () => String, minLength: 6, maxLength: 20, pattern: "/^[a-zA-Z0-9_-]{4,16}$/" } };
    }
}
exports.UserExistDto = UserExistDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '登录账号' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9_-]{4,16}$/),
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], UserExistDto.prototype, "username", void 0);
//# sourceMappingURL=password.dto.js.map