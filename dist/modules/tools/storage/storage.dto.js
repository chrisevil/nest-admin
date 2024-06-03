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
exports.StorageDeleteDto = exports.StorageCreateDto = exports.StoragePageDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const pager_dto_1 = require("../../../common/dto/pager.dto");
class StoragePageDto extends pager_dto_1.PagerDto {
    name;
    extName;
    type;
    size;
    time;
    username;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, extName: { required: true, type: () => String }, type: { required: true, type: () => String }, size: { required: true, type: () => String }, time: { required: true, type: () => [String] }, username: { required: true, type: () => String } };
    }
}
exports.StoragePageDto = StoragePageDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '文件名' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StoragePageDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '文件后缀' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], StoragePageDto.prototype, "extName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '文件类型' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], StoragePageDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '大小' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], StoragePageDto.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '上传时间' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], StoragePageDto.prototype, "time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '上传者' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], StoragePageDto.prototype, "username", void 0);
class StorageCreateDto {
    name;
    fileName;
    extName;
    path;
    type;
    size;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, fileName: { required: true, type: () => String }, extName: { required: true, type: () => String }, path: { required: true, type: () => String }, type: { required: true, type: () => String }, size: { required: true, type: () => String } };
    }
}
exports.StorageCreateDto = StorageCreateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '文件名' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StorageCreateDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '真实文件名' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StorageCreateDto.prototype, "fileName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '文件扩展名' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StorageCreateDto.prototype, "extName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '文件路径' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StorageCreateDto.prototype, "path", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '文件路径' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StorageCreateDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '文件大小' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StorageCreateDto.prototype, "size", void 0);
class StorageDeleteDto {
    ids;
    static _OPENAPI_METADATA_FACTORY() {
        return { ids: { required: true, type: () => [Number] } };
    }
}
exports.StorageDeleteDto = StorageDeleteDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '需要删除的文件ID列表', type: [Number] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    __metadata("design:type", Array)
], StorageDeleteDto.prototype, "ids", void 0);
//# sourceMappingURL=storage.dto.js.map