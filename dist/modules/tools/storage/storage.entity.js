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
exports.Storage = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const common_entity_1 = require("../../../common/entity/common.entity");
let Storage = class Storage extends common_entity_1.CommonEntity {
    name;
    fileName;
    extName;
    path;
    type;
    size;
    userId;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, fileName: { required: true, type: () => String }, extName: { required: true, type: () => String }, path: { required: true, type: () => String }, type: { required: true, type: () => String }, size: { required: true, type: () => String }, userId: { required: true, type: () => Number } };
    }
};
exports.Storage = Storage;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200, comment: '文件名' }),
    (0, swagger_1.ApiProperty)({ description: '文件名' }),
    __metadata("design:type", String)
], Storage.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 200,
        nullable: true,
        comment: '真实文件名',
    }),
    (0, swagger_1.ApiProperty)({ description: '真实文件名' }),
    __metadata("design:type", String)
], Storage.prototype, "fileName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ext_name', type: 'varchar', nullable: true }),
    (0, swagger_1.ApiProperty)({ description: '扩展名' }),
    __metadata("design:type", String)
], Storage.prototype, "extName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    (0, swagger_1.ApiProperty)({ description: '文件类型' }),
    __metadata("design:type", String)
], Storage.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    (0, swagger_1.ApiProperty)({ description: '文件类型' }),
    __metadata("design:type", String)
], Storage.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    (0, swagger_1.ApiProperty)({ description: '文件大小' }),
    __metadata("design:type", String)
], Storage.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'user_id' }),
    (0, swagger_1.ApiProperty)({ description: '用户ID' }),
    __metadata("design:type", Number)
], Storage.prototype, "userId", void 0);
exports.Storage = Storage = __decorate([
    (0, typeorm_1.Entity)({ name: 'tool_storage' })
], Storage);
//# sourceMappingURL=storage.entity.js.map