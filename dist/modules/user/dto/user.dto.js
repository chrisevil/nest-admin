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
exports.UserQueryDto = exports.UserUpdateDto = exports.UserDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const lodash_1 = require("lodash");
const pager_dto_1 = require("../../../common/dto/pager.dto");
class UserDto {
    avatar;
    username;
    password;
    roleIds;
    deptId;
    nickname;
    email;
    phone;
    qq;
    remark;
    status;
    static _OPENAPI_METADATA_FACTORY() {
        return { avatar: { required: false, type: () => String }, username: { required: true, type: () => String, minLength: 4, maxLength: 20, pattern: "/^[a-z0-9A-Z\\W_]+$/" }, password: { required: true, type: () => String, pattern: "/^\\S*(?=\\S{6,})(?=\\S*\\d)(?=\\S*[A-Za-z])\\S*$/" }, roleIds: { required: true, type: () => [Number] }, deptId: { required: false, type: () => Number }, nickname: { required: true, type: () => String }, email: { required: true, type: () => String }, phone: { required: false, type: () => String }, qq: { required: false, type: () => String, minLength: 5, maxLength: 11, pattern: "/^[1-9][0-9]{4,10}$/" }, remark: { required: false, type: () => String }, status: { required: true, type: () => Number, enum: [0, 1] } };
    }
}
exports.UserDto = UserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '头像' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDto.prototype, "avatar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '登录账号', example: 'admin' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[a-z0-9A-Z\W_]+$/),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], UserDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '登录密码', example: 'a123456' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Za-z])\S*$/, {
        message: '密码必须包含数字、字母，长度为6-16',
    }),
    __metadata("design:type", String)
], UserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '归属角色', type: [Number] }),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ArrayMaxSize)(3),
    __metadata("design:type", Array)
], UserDto.prototype, "roleIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '归属大区', type: Number }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UserDto.prototype, "deptId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '呢称', example: 'admin' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDto.prototype, "nickname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '邮箱', example: 'bqy.dev@qq.com' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.ValidateIf)(o => !(0, lodash_1.isEmpty)(o.email)),
    __metadata("design:type", String)
], UserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '手机号' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'QQ' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[1-9][0-9]{4,10}$/),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(11),
    __metadata("design:type", String)
], UserDto.prototype, "qq", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '备注' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDto.prototype, "remark", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '状态' }),
    (0, class_validator_1.IsIn)([0, 1]),
    __metadata("design:type", Number)
], UserDto.prototype, "status", void 0);
class UserUpdateDto extends (0, swagger_1.PartialType)(UserDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UserUpdateDto = UserUpdateDto;
class UserQueryDto extends (0, swagger_1.IntersectionType)((pager_dto_1.PagerDto), (0, swagger_1.PartialType)(UserDto)) {
    deptId;
    status;
    static _OPENAPI_METADATA_FACTORY() {
        return { deptId: { required: false, type: () => Number }, status: { required: false, type: () => Number } };
    }
}
exports.UserQueryDto = UserQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '归属大区', example: 1, required: false }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UserQueryDto.prototype, "deptId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '状态', example: 0, required: false }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UserQueryDto.prototype, "status", void 0);
//# sourceMappingURL=user.dto.js.map