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
exports.RoleEntity = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const common_entity_1 = require("../../../common/entity/common.entity");
const user_entity_1 = require("../../user/user.entity");
const menu_entity_1 = require("../menu/menu.entity");
let RoleEntity = class RoleEntity extends common_entity_1.CommonEntity {
    name;
    value;
    remark;
    status;
    default;
    users;
    menus;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, value: { required: true, type: () => String }, remark: { required: true, type: () => String }, status: { required: true, type: () => Number }, default: { required: true, type: () => Boolean } };
    }
};
exports.RoleEntity = RoleEntity;
__decorate([
    (0, typeorm_1.Column)({ length: 50, unique: true }),
    (0, swagger_1.ApiProperty)({ description: '角色名' }),
    __metadata("design:type", String)
], RoleEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, swagger_1.ApiProperty)({ description: '角色标识' }),
    __metadata("design:type", String)
], RoleEntity.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({ description: '角色描述' }),
    __metadata("design:type", String)
], RoleEntity.prototype, "remark", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', nullable: true, default: 1 }),
    (0, swagger_1.ApiProperty)({ description: '状态：1启用，0禁用' }),
    __metadata("design:type", Number)
], RoleEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({ description: '是否默认用户' }),
    __metadata("design:type", Boolean)
], RoleEntity.prototype, "default", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.ManyToMany)(() => user_entity_1.UserEntity, user => user.roles),
    __metadata("design:type", Object)
], RoleEntity.prototype, "users", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.ManyToMany)(() => menu_entity_1.MenuEntity, menu => menu.roles, {}),
    (0, typeorm_1.JoinTable)({
        name: 'sys_role_menus',
        joinColumn: { name: 'role_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'menu_id', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Object)
], RoleEntity.prototype, "menus", void 0);
exports.RoleEntity = RoleEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'sys_role' })
], RoleEntity);
//# sourceMappingURL=role.entity.js.map