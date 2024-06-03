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
exports.FileUploadDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const file_constraint_1 = require("./file.constraint");
class FileUploadDto {
    file;
    static _OPENAPI_METADATA_FACTORY() {
        return { file: { required: true, type: () => Object } };
    }
}
exports.FileUploadDto = FileUploadDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary', description: '文件' }),
    (0, class_validator_1.IsDefined)(),
    (0, file_constraint_1.IsFile)({
        mimetypes: [
            'image/png',
            'image/gif',
            'image/jpeg',
            'image/webp',
            'image/svg+xml',
        ],
        fileSize: 1024 * 1024 * 10,
    }, {
        message: '文件类型不正确',
    }),
    __metadata("design:type", Object)
], FileUploadDto.prototype, "file", void 0);
//# sourceMappingURL=upload.dto.js.map