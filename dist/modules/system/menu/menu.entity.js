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
exports.MenuEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const common_entity_1 = require("../../../common/entity/common.entity");
const role_entity_1 = require("../role/role.entity");
let MenuEntity = class MenuEntity extends common_entity_1.CommonEntity {
    parentId;
    name;
    path;
    permission;
    type;
    icon;
    orderNo;
    component;
    isExt;
    extOpenMode;
    keepAlive;
    show;
    activeMenu;
    status;
    roles;
    static _OPENAPI_METADATA_FACTORY() {
        return { parentId: { required: true, type: () => Number }, name: { required: true, type: () => String }, path: { required: true, type: () => String }, permission: { required: true, type: () => String }, type: { required: true, type: () => Number }, icon: { required: true, type: () => String }, orderNo: { required: true, type: () => Number }, component: { required: true, type: () => String }, isExt: { required: true, type: () => Boolean }, extOpenMode: { required: true, type: () => Number }, keepAlive: { required: true, type: () => Number }, show: { required: true, type: () => Number }, activeMenu: { required: true, type: () => String }, status: { required: true, type: () => Number }, roles: { required: true, type: () => [require("../role/role.entity").RoleEntity] } };
    }
};
exports.MenuEntity = MenuEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'parent_id', nullable: true }),
    __metadata("design:type", Number)
], MenuEntity.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MenuEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MenuEntity.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MenuEntity.prototype, "permission", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', default: 0 }),
    __metadata("design:type", Number)
], MenuEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: '' }),
    __metadata("design:type", String)
], MenuEntity.prototype, "icon", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'order_no', type: 'int', nullable: true, default: 0 }),
    __metadata("design:type", Number)
], MenuEntity.prototype, "orderNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'component', nullable: true }),
    __metadata("design:type", String)
], MenuEntity.prototype, "component", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_ext', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], MenuEntity.prototype, "isExt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ext_open_mode', type: 'tinyint', default: 1 }),
    __metadata("design:type", Number)
], MenuEntity.prototype, "extOpenMode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'keep_alive', type: 'tinyint', default: 1 }),
    __metadata("design:type", Number)
], MenuEntity.prototype, "keepAlive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', default: 1 }),
    __metadata("design:type", Number)
], MenuEntity.prototype, "show", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'active_menu', nullable: true }),
    __metadata("design:type", String)
], MenuEntity.prototype, "activeMenu", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', default: 1 }),
    __metadata("design:type", Number)
], MenuEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => role_entity_1.RoleEntity, role => role.menus, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Object)
], MenuEntity.prototype, "roles", void 0);
exports.MenuEntity = MenuEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'sys_menu' })
], MenuEntity);
//# sourceMappingURL=menu.entity.js.map