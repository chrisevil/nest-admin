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
exports.UserEntity = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const common_entity_1 = require("../../common/entity/common.entity");
const access_token_entity_1 = require("../auth/entities/access-token.entity");
const dept_entity_1 = require("../system/dept/dept.entity");
const role_entity_1 = require("../system/role/role.entity");
let UserEntity = class UserEntity extends common_entity_1.CommonEntity {
    username;
    password;
    psalt;
    nickname;
    avatar;
    qq;
    email;
    phone;
    remark;
    status;
    roles;
    dept;
    accessTokens;
    static _OPENAPI_METADATA_FACTORY() {
        return { username: { required: true, type: () => String }, password: { required: true, type: () => String }, psalt: { required: true, type: () => String }, nickname: { required: true, type: () => String }, avatar: { required: true, type: () => String }, qq: { required: true, type: () => String }, email: { required: true, type: () => String }, phone: { required: true, type: () => String }, remark: { required: true, type: () => String }, status: { required: true, type: () => Number }, roles: { required: true, type: () => [require("../system/role/role.entity").RoleEntity] }, dept: { required: true, type: () => require("../system/dept/dept.entity").DeptEntity }, accessTokens: { required: true, type: () => [require("../auth/entities/access-token.entity").AccessTokenEntity] } };
    }
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 32 }),
    __metadata("design:type", String)
], UserEntity.prototype, "psalt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'avatar', nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "qq", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "remark", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', nullable: true, default: 1 }),
    __metadata("design:type", Number)
], UserEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => role_entity_1.RoleEntity, role => role.users),
    (0, typeorm_1.JoinTable)({
        name: 'sys_user_roles',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Object)
], UserEntity.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => dept_entity_1.DeptEntity, dept => dept.users),
    (0, typeorm_1.JoinColumn)({ name: 'dept_id' }),
    __metadata("design:type", Object)
], UserEntity.prototype, "dept", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => access_token_entity_1.AccessTokenEntity, accessToken => accessToken.user, {
        cascade: true,
    }),
    __metadata("design:type", Object)
], UserEntity.prototype, "accessTokens", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'sys_user' })
], UserEntity);
//# sourceMappingURL=user.entity.js.map