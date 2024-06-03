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
exports.DeptEntity = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const common_entity_1 = require("../../../common/entity/common.entity");
const user_entity_1 = require("../../user/user.entity");
let DeptEntity = class DeptEntity extends common_entity_1.CommonEntity {
    name;
    orderNo;
    children;
    parent;
    users;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, orderNo: { required: true, type: () => Number }, children: { required: true, type: () => [require("./dept.entity").DeptEntity] }, parent: { required: false, type: () => require("./dept.entity").DeptEntity } };
    }
};
exports.DeptEntity = DeptEntity;
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: '部门名称' }),
    __metadata("design:type", String)
], DeptEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 0 }),
    (0, swagger_1.ApiProperty)({ description: '排序' }),
    __metadata("design:type", Number)
], DeptEntity.prototype, "orderNo", void 0);
__decorate([
    (0, typeorm_1.TreeChildren)({ cascade: true }),
    __metadata("design:type", Array)
], DeptEntity.prototype, "children", void 0);
__decorate([
    (0, typeorm_1.TreeParent)({ onDelete: 'SET NULL' }),
    __metadata("design:type", DeptEntity)
], DeptEntity.prototype, "parent", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.OneToMany)(() => user_entity_1.UserEntity, user => user.dept),
    __metadata("design:type", Object)
], DeptEntity.prototype, "users", void 0);
exports.DeptEntity = DeptEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'sys_dept' }),
    (0, typeorm_1.Tree)('materialized-path')
], DeptEntity);
//# sourceMappingURL=dept.entity.js.map