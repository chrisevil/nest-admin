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
exports.LoginLogEntity = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const common_entity_1 = require("../../../../common/entity/common.entity");
const user_entity_1 = require("../../../user/user.entity");
let LoginLogEntity = class LoginLogEntity extends common_entity_1.CommonEntity {
    ip;
    address;
    provider;
    ua;
    user;
    static _OPENAPI_METADATA_FACTORY() {
        return { ip: { required: true, type: () => String }, address: { required: true, type: () => String }, provider: { required: true, type: () => String }, ua: { required: true, type: () => String }, user: { required: true, type: () => require("../../../user/user.entity").UserEntity } };
    }
};
exports.LoginLogEntity = LoginLogEntity;
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({ description: 'IP' }),
    __metadata("design:type", String)
], LoginLogEntity.prototype, "ip", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({ description: '地址' }),
    __metadata("design:type", String)
], LoginLogEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({ description: '登录方式' }),
    __metadata("design:type", String)
], LoginLogEntity.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true }),
    (0, swagger_1.ApiProperty)({ description: '浏览器ua' }),
    __metadata("design:type", String)
], LoginLogEntity.prototype, "ua", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", Object)
], LoginLogEntity.prototype, "user", void 0);
exports.LoginLogEntity = LoginLogEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'sys_login_log' })
], LoginLogEntity);
//# sourceMappingURL=login-log.entity.js.map