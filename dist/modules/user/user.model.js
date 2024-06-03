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
exports.AccountInfo = void 0;
const swagger_1 = require("@nestjs/swagger");
class AccountInfo {
    username;
    nickname;
    email;
    phone;
    remark;
    avatar;
}
exports.AccountInfo = AccountInfo;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '用户名' }),
    __metadata("design:type", String)
], AccountInfo.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '昵称' }),
    __metadata("design:type", String)
], AccountInfo.prototype, "nickname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '邮箱' }),
    __metadata("design:type", String)
], AccountInfo.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '手机号' }),
    __metadata("design:type", String)
], AccountInfo.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '备注' }),
    __metadata("design:type", String)
], AccountInfo.prototype, "remark", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '头像' }),
    __metadata("design:type", String)
], AccountInfo.prototype, "avatar", void 0);
//# sourceMappingURL=user.model.js.map