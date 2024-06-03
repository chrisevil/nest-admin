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
exports.DictTypeQueryDto = exports.DictTypeDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const pager_dto_1 = require("../../../common/dto/pager.dto");
const dict_type_entity_1 = require("./dict-type.entity");
class DictTypeDto extends (0, swagger_1.PartialType)(dict_type_entity_1.DictTypeEntity) {
    name;
    code;
    status;
    remark;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, minLength: 1 }, code: { required: true, type: () => String, minLength: 3 }, status: { required: false, type: () => Number }, remark: { required: false, type: () => String } };
    }
}
exports.DictTypeDto = DictTypeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '字典类型名称' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], DictTypeDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '字典类型code' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    __metadata("design:type", String)
], DictTypeDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '状态' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DictTypeDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '备注' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DictTypeDto.prototype, "remark", void 0);
class DictTypeQueryDto extends pager_dto_1.PagerDto {
    name;
    code;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, code: { required: true, type: () => String } };
    }
}
exports.DictTypeQueryDto = DictTypeQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '字典类型名称' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DictTypeQueryDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '字典类型code' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DictTypeQueryDto.prototype, "code", void 0);
//# sourceMappingURL=dict-type.dto.js.map