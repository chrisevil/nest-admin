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
exports.DictTypeEntity = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const common_entity_1 = require("../../../common/entity/common.entity");
let DictTypeEntity = class DictTypeEntity extends common_entity_1.CompleteEntity {
    name;
    code;
    status;
    remark;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, code: { required: true, type: () => String }, status: { required: true, type: () => Number }, remark: { required: true, type: () => String } };
    }
};
exports.DictTypeEntity = DictTypeEntity;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    (0, swagger_1.ApiProperty)({ description: '字典名称' }),
    __metadata("design:type", String)
], DictTypeEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, unique: true }),
    (0, swagger_1.ApiProperty)({ description: '字典类型' }),
    __metadata("design:type", String)
], DictTypeEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', default: 1 }),
    (0, swagger_1.ApiProperty)({ description: ' 状态' }),
    __metadata("design:type", Number)
], DictTypeEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    (0, swagger_1.ApiProperty)({ description: '备注' }),
    __metadata("design:type", String)
], DictTypeEntity.prototype, "remark", void 0);
exports.DictTypeEntity = DictTypeEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'sys_dict_type' })
], DictTypeEntity);
//# sourceMappingURL=dict-type.entity.js.map