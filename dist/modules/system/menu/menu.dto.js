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
exports.MenuQueryDto = exports.MenuUpdateDto = exports.MenuDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class MenuDto {
    type;
    parentId;
    name;
    orderNo;
    path;
    isExt;
    extOpenMode;
    show;
    activeMenu;
    keepAlive;
    status;
    icon;
    permission;
    component;
    static _OPENAPI_METADATA_FACTORY() {
        return { type: { required: true, type: () => Number, enum: [0, 1, 2] }, parentId: { required: true, type: () => Number }, name: { required: true, type: () => String, minLength: 2 }, orderNo: { required: true, type: () => Number, minimum: 0 }, path: { required: true, type: () => String }, isExt: { required: true, type: () => Boolean }, extOpenMode: { required: true, type: () => Number, enum: [1, 2] }, show: { required: true, type: () => Number, enum: [0, 1] }, activeMenu: { required: false, type: () => String }, keepAlive: { required: true, type: () => Number, enum: [0, 1] }, status: { required: true, type: () => Number, enum: [0, 1] }, icon: { required: false, type: () => String }, permission: { required: true, type: () => String }, component: { required: false, type: () => String } };
    }
}
exports.MenuDto = MenuDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '菜单类型' }),
    (0, class_validator_1.IsIn)([0, 1, 2]),
    __metadata("design:type", Number)
], MenuDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '父级菜单' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], MenuDto.prototype, "parentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '菜单或权限名称' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], MenuDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '排序' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], MenuDto.prototype, "orderNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '前端路由地址' }),
    (0, class_validator_1.ValidateIf)(o => o.type !== 2),
    __metadata("design:type", String)
], MenuDto.prototype, "path", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '是否外链', default: false }),
    (0, class_validator_1.ValidateIf)(o => o.type !== 2),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], MenuDto.prototype, "isExt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '外链打开方式', default: 1 }),
    (0, class_validator_1.ValidateIf)((o) => o.isExt),
    (0, class_validator_1.IsIn)([1, 2]),
    __metadata("design:type", Number)
], MenuDto.prototype, "extOpenMode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '菜单是否显示', default: 1 }),
    (0, class_validator_1.ValidateIf)((o) => o.type !== 2),
    (0, class_validator_1.IsIn)([0, 1]),
    __metadata("design:type", Number)
], MenuDto.prototype, "show", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '设置当前路由高亮的菜单项，一般用于详情页' }),
    (0, class_validator_1.ValidateIf)((o) => o.type !== 2 && o.show === 0),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], MenuDto.prototype, "activeMenu", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '是否开启页面缓存', default: 1 }),
    (0, class_validator_1.ValidateIf)((o) => o.type === 1),
    (0, class_validator_1.IsIn)([0, 1]),
    __metadata("design:type", Number)
], MenuDto.prototype, "keepAlive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '状态', default: 1 }),
    (0, class_validator_1.IsIn)([0, 1]),
    __metadata("design:type", Number)
], MenuDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '菜单图标' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((o) => o.type !== 2),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MenuDto.prototype, "icon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '对应权限' }),
    (0, class_validator_1.ValidateIf)((o) => o.type === 2),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], MenuDto.prototype, "permission", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '菜单路由路径或外链' }),
    (0, class_validator_1.ValidateIf)((o) => o.type !== 2),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], MenuDto.prototype, "component", void 0);
class MenuUpdateDto extends (0, swagger_1.PartialType)(MenuDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.MenuUpdateDto = MenuUpdateDto;
class MenuQueryDto extends (0, swagger_1.PartialType)(MenuDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.MenuQueryDto = MenuQueryDto;
//# sourceMappingURL=menu.dto.js.map