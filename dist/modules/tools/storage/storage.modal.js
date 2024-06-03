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
exports.StorageInfo = void 0;
const swagger_1 = require("@nestjs/swagger");
class StorageInfo {
    id;
    name;
    extName;
    path;
    type;
    size;
    createdAt;
    username;
}
exports.StorageInfo = StorageInfo;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '文件ID' }),
    __metadata("design:type", Number)
], StorageInfo.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '文件名' }),
    __metadata("design:type", String)
], StorageInfo.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '文件扩展名' }),
    __metadata("design:type", String)
], StorageInfo.prototype, "extName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '文件路径' }),
    __metadata("design:type", String)
], StorageInfo.prototype, "path", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '文件类型' }),
    __metadata("design:type", String)
], StorageInfo.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '大小' }),
    __metadata("design:type", String)
], StorageInfo.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '上传时间' }),
    __metadata("design:type", String)
], StorageInfo.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '上传者' }),
    __metadata("design:type", String)
], StorageInfo.prototype, "username", void 0);
//# sourceMappingURL=storage.modal.js.map