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
exports.CompleteEntity = exports.CommonEntity = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
class CommonEntity extends typeorm_1.BaseEntity {
    id;
    createdAt;
    updatedAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
}
exports.CommonEntity = CommonEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CommonEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], CommonEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], CommonEntity.prototype, "updatedAt", void 0);
class CompleteEntity extends CommonEntity {
    createBy;
    updateBy;
    creator;
    updater;
    static _OPENAPI_METADATA_FACTORY() {
        return { creator: { required: true, type: () => String, description: "\u4E0D\u4F1A\u4FDD\u5B58\u5230\u6570\u636E\u5E93\u4E2D\u7684\u865A\u62DF\u5217\uFF0C\u6570\u636E\u91CF\u5927\u65F6\u53EF\u80FD\u4F1A\u6709\u6027\u80FD\u95EE\u9898\uFF0C\u6709\u6027\u80FD\u8981\u6C42\u8BF7\u8003\u8651\u5728 service \u5C42\u624B\u52A8\u5B9E\u73B0" }, updater: { required: true, type: () => String } };
    }
}
exports.CompleteEntity = CompleteEntity;
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ name: 'create_by', update: false, comment: '创建者' }),
    __metadata("design:type", Number)
], CompleteEntity.prototype, "createBy", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ name: 'update_by', comment: '更新者' }),
    __metadata("design:type", Number)
], CompleteEntity.prototype, "updateBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '创建者' }),
    (0, typeorm_1.VirtualColumn)({ query: alias => `SELECT username FROM sys_user WHERE id = ${alias}.create_by` }),
    __metadata("design:type", String)
], CompleteEntity.prototype, "creator", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '更新者' }),
    (0, typeorm_1.VirtualColumn)({ query: alias => `SELECT username FROM sys_user WHERE id = ${alias}.update_by` }),
    __metadata("design:type", String)
], CompleteEntity.prototype, "updater", void 0);
//# sourceMappingURL=common.entity.js.map