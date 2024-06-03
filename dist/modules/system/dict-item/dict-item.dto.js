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
exports.DictItemQueryDto = exports.DictItemDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const pager_dto_1 = require("../../../common/dto/pager.dto");
const dict_item_entity_1 = require("./dict-item.entity");
class DictItemDto extends (0, swagger_1.PartialType)(dict_item_entity_1.DictItemEntity) {
    typeId;
    label;
    value;
    status;
    remark;
    static _OPENAPI_METADATA_FACTORY() {
        return { typeId: { required: true, type: () => Number }, label: { required: true, type: () => String, minLength: 1 }, value: { required: true, type: () => String, minLength: 1 }, status: { required: false, type: () => Number }, remark: { required: false, type: () => String } };
    }
}
exports.DictItemDto = DictItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '字典类型 ID' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DictItemDto.prototype, "typeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '字典项键名' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], DictItemDto.prototype, "label", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '字典项值' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], DictItemDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '状态' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DictItemDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '备注' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DictItemDto.prototype, "remark", void 0);
class DictItemQueryDto extends pager_dto_1.PagerDto {
    typeId;
    label;
    value;
    static _OPENAPI_METADATA_FACTORY() {
        return { typeId: { required: true, type: () => Number }, label: { required: false, type: () => String }, value: { required: false, type: () => String } };
    }
}
exports.DictItemQueryDto = DictItemQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '字典类型 ID', required: true }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DictItemQueryDto.prototype, "typeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '字典项键名' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DictItemQueryDto.prototype, "label", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '字典项值' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DictItemQueryDto.prototype, "value", void 0);
//# sourceMappingURL=dict-item.dto.js.map