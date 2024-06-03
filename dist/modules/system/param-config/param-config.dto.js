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
exports.ParamConfigQueryDto = exports.ParamConfigDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const pager_dto_1 = require("../../../common/dto/pager.dto");
class ParamConfigDto {
    name;
    key;
    value;
    remark;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, key: { required: true, type: () => String, minLength: 3 }, value: { required: true, type: () => String }, remark: { required: false, type: () => String } };
    }
}
exports.ParamConfigDto = ParamConfigDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '参数名称' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ParamConfigDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '参数键名' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    __metadata("design:type", String)
], ParamConfigDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '参数值' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ParamConfigDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '备注' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ParamConfigDto.prototype, "remark", void 0);
class ParamConfigQueryDto extends pager_dto_1.PagerDto {
    name;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String } };
    }
}
exports.ParamConfigQueryDto = ParamConfigQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '参数名称' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ParamConfigQueryDto.prototype, "name", void 0);
//# sourceMappingURL=param-config.dto.js.map