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
exports.DictItemEntity = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const common_entity_1 = require("../../../common/entity/common.entity");
const dict_type_entity_1 = require("../dict-type/dict-type.entity");
let DictItemEntity = class DictItemEntity extends common_entity_1.CompleteEntity {
    type;
    label;
    value;
    orderNo;
    status;
    remark;
    static _OPENAPI_METADATA_FACTORY() {
        return { type: { required: true, type: () => require("../dict-type/dict-type.entity").DictTypeEntity }, label: { required: true, type: () => String }, value: { required: true, type: () => String }, orderNo: { required: true, type: () => Number }, status: { required: true, type: () => Number }, remark: { required: true, type: () => String } };
    }
};
exports.DictItemEntity = DictItemEntity;
__decorate([
    (0, typeorm_1.ManyToOne)(() => dict_type_entity_1.DictTypeEntity, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'type_id' }),
    __metadata("design:type", dict_type_entity_1.DictTypeEntity)
], DictItemEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    (0, swagger_1.ApiProperty)({ description: '字典项键名' }),
    __metadata("design:type", String)
], DictItemEntity.prototype, "label", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    (0, swagger_1.ApiProperty)({ description: '字典项值' }),
    __metadata("design:type", String)
], DictItemEntity.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '字典项排序' }),
    __metadata("design:type", Number)
], DictItemEntity.prototype, "orderNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', default: 1 }),
    (0, swagger_1.ApiProperty)({ description: ' 状态' }),
    __metadata("design:type", Number)
], DictItemEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    (0, swagger_1.ApiProperty)({ description: '备注' }),
    __metadata("design:type", String)
], DictItemEntity.prototype, "remark", void 0);
exports.DictItemEntity = DictItemEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'sys_dict_item' })
], DictItemEntity);
//# sourceMappingURL=dict-item.entity.js.map