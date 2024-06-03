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
exports.RoleQueryDto = exports.RoleUpdateDto = exports.RoleDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const pager_dto_1 = require("../../../common/dto/pager.dto");
class RoleDto {
    name;
    value;
    remark;
    status;
    menuIds;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, minLength: 2 }, value: { required: true, type: () => String, minLength: 2, pattern: "/^[a-z0-9A-Z]+$/" }, remark: { required: false, type: () => String }, status: { required: true, type: () => Number, enum: [0, 1] }, menuIds: { required: false, type: () => [Number] } };
    }
}
exports.RoleDto = RoleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '角色名称' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2, { message: '角色名称长度不能小于2' }),
    __metadata("design:type", String)
], RoleDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '角色值' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[a-z0-9A-Z]+$/, { message: '角色值只能包含字母和数字' }),
    (0, class_validator_1.MinLength)(2, { message: '角色值长度不能小于2' }),
    __metadata("design:type", String)
], RoleDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '角色备注' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RoleDto.prototype, "remark", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '状态' }),
    (0, class_validator_1.IsIn)([0, 1]),
    __metadata("design:type", Number)
], RoleDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '关联菜单、权限编号' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], RoleDto.prototype, "menuIds", void 0);
class RoleUpdateDto extends (0, swagger_1.PartialType)(RoleDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.RoleUpdateDto = RoleUpdateDto;
class RoleQueryDto extends (0, swagger_1.IntersectionType)((pager_dto_1.PagerDto), (0, swagger_1.PartialType)(RoleDto)) {
    name;
    value;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: false, type: () => String }, value: { required: true, type: () => String } };
    }
}
exports.RoleQueryDto = RoleQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '角色名称', required: false }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RoleQueryDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '角色值', required: false }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RoleQueryDto.prototype, "value", void 0);
//# sourceMappingURL=role.dto.js.map