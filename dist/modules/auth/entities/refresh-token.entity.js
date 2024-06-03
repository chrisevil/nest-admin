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
exports.RefreshTokenEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const access_token_entity_1 = require("./access-token.entity");
let RefreshTokenEntity = class RefreshTokenEntity extends typeorm_1.BaseEntity {
    id;
    value;
    expired_at;
    created_at;
    accessToken;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, value: { required: true, type: () => String }, expired_at: { required: true, type: () => Date }, created_at: { required: true, type: () => Date }, accessToken: { required: true, type: () => require("./access-token.entity").AccessTokenEntity } };
    }
};
exports.RefreshTokenEntity = RefreshTokenEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RefreshTokenEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500 }),
    __metadata("design:type", String)
], RefreshTokenEntity.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '令牌过期时间' }),
    __metadata("design:type", Date)
], RefreshTokenEntity.prototype, "expired_at", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ comment: '令牌创建时间' }),
    __metadata("design:type", Date)
], RefreshTokenEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => access_token_entity_1.AccessTokenEntity, accessToken => accessToken.refreshToken, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", access_token_entity_1.AccessTokenEntity)
], RefreshTokenEntity.prototype, "accessToken", void 0);
exports.RefreshTokenEntity = RefreshTokenEntity = __decorate([
    (0, typeorm_1.Entity)('user_refresh_tokens')
], RefreshTokenEntity);
//# sourceMappingURL=refresh-token.entity.js.map