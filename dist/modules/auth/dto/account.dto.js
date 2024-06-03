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
exports.AccountMenus = exports.MenuMeta = exports.ResetPasswordDto = exports.AccountUpdateDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const menu_entity_1 = require("../../system/menu/menu.entity");
class AccountUpdateDto {
    nickname;
    email;
    qq;
    phone;
    avatar;
    remark;
    static _OPENAPI_METADATA_FACTORY() {
        return { nickname: { required: true, type: () => String }, email: { required: true, type: () => String }, qq: { required: true, type: () => String, minLength: 5, maxLength: 11, pattern: "/^[0-9]+$/" }, phone: { required: true, type: () => String }, avatar: { required: true, type: () => String }, remark: { required: true, type: () => String } };
    }
}
exports.AccountUpdateDto = AccountUpdateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '用户呢称' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AccountUpdateDto.prototype, "nickname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '用户邮箱' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], AccountUpdateDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '用户QQ' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[0-9]+$/),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(11),
    __metadata("design:type", String)
], AccountUpdateDto.prototype, "qq", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '用户手机号' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AccountUpdateDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '用户头像' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AccountUpdateDto.prototype, "avatar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '用户备注' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AccountUpdateDto.prototype, "remark", void 0);
class ResetPasswordDto {
    accessToken;
    password;
    static _OPENAPI_METADATA_FACTORY() {
        return { accessToken: { required: true, type: () => String }, password: { required: true, type: () => String, minLength: 6, pattern: "/^\\S*(?=\\S{6,})(?=\\S*\\d)(?=\\S*[A-Za-z])\\S*$/" } };
    }
}
exports.ResetPasswordDto = ResetPasswordDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '临时token', example: 'uuid' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '密码', example: 'a123456' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Za-z])\S*$/),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "password", void 0);
class MenuMeta extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(menu_entity_1.MenuEntity, ['parentId', 'createdAt', 'updatedAt', 'id', 'roles', 'path', 'name'])) {
    title;
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: true, type: () => String } };
    }
}
exports.MenuMeta = MenuMeta;
class AccountMenus extends (0, swagger_1.PickType)(menu_entity_1.MenuEntity, ['id', 'path', 'name', 'component']) {
    meta;
    static _OPENAPI_METADATA_FACTORY() {
        return { meta: { required: true, type: () => require("./account.dto").MenuMeta } };
    }
}
exports.AccountMenus = AccountMenus;
//# sourceMappingURL=account.dto.js.map