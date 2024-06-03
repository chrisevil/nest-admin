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
exports.ParamConfigEntity = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const common_entity_1 = require("../../../common/entity/common.entity");
let ParamConfigEntity = class ParamConfigEntity extends common_entity_1.CommonEntity {
    name;
    key;
    value;
    remark;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, key: { required: true, type: () => String }, value: { required: true, type: () => String }, remark: { required: true, type: () => String } };
    }
};
exports.ParamConfigEntity = ParamConfigEntity;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    (0, swagger_1.ApiProperty)({ description: '配置名' }),
    __metadata("design:type", String)
], ParamConfigEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, unique: true }),
    (0, swagger_1.ApiProperty)({ description: '配置键名' }),
    __metadata("design:type", String)
], ParamConfigEntity.prototype, "key", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    (0, swagger_1.ApiProperty)({ description: '配置值' }),
    __metadata("design:type", String)
], ParamConfigEntity.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    (0, swagger_1.ApiProperty)({ description: '配置描述' }),
    __metadata("design:type", String)
], ParamConfigEntity.prototype, "remark", void 0);
exports.ParamConfigEntity = ParamConfigEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'sys_config' })
], ParamConfigEntity);
//# sourceMappingURL=param-config.entity.js.map