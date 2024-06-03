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
exports.AccessTokenEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/user.entity");
const refresh_token_entity_1 = require("./refresh-token.entity");
let AccessTokenEntity = class AccessTokenEntity extends typeorm_1.BaseEntity {
    id;
    value;
    expired_at;
    created_at;
    refreshToken;
    user;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, value: { required: true, type: () => String }, expired_at: { required: true, type: () => Date }, created_at: { required: true, type: () => Date }, refreshToken: { required: true, type: () => require("./refresh-token.entity").RefreshTokenEntity }, user: { required: true, type: () => require("../../user/user.entity").UserEntity } };
    }
};
exports.AccessTokenEntity = AccessTokenEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AccessTokenEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500 }),
    __metadata("design:type", String)
], AccessTokenEntity.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '令牌过期时间' }),
    __metadata("design:type", Date)
], AccessTokenEntity.prototype, "expired_at", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ comment: '令牌创建时间' }),
    __metadata("design:type", Date)
], AccessTokenEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => refresh_token_entity_1.RefreshTokenEntity, refreshToken => refreshToken.accessToken, {
        cascade: true,
    }),
    __metadata("design:type", refresh_token_entity_1.RefreshTokenEntity)
], AccessTokenEntity.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.accessTokens, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], AccessTokenEntity.prototype, "user", void 0);
exports.AccessTokenEntity = AccessTokenEntity = __decorate([
    (0, typeorm_1.Entity)('user_access_tokens')
], AccessTokenEntity);
//# sourceMappingURL=access-token.entity.js.map