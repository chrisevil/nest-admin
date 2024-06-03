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
exports.OnlineUserInfo = void 0;
const swagger_1 = require("@nestjs/swagger");
const log_model_1 = require("../log/models/log.model");
class OnlineUserInfo extends (0, swagger_1.OmitType)(log_model_1.LoginLogInfo, ['id']) {
    tokenId;
    deptName;
    uid;
    isCurrent;
    disable;
}
exports.OnlineUserInfo = OnlineUserInfo;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'tokenId' }),
    __metadata("design:type", String)
], OnlineUserInfo.prototype, "tokenId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '部门名称' }),
    __metadata("design:type", String)
], OnlineUserInfo.prototype, "deptName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '用户ID' }),
    __metadata("design:type", Number)
], OnlineUserInfo.prototype, "uid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '是否为当前登录用户' }),
    __metadata("design:type", Boolean)
], OnlineUserInfo.prototype, "isCurrent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '不允许踢当前用户或超级管理员下线' }),
    __metadata("design:type", Boolean)
], OnlineUserInfo.prototype, "disable", void 0);
//# sourceMappingURL=online.model.js.map