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
exports.AccmWorkNotificationEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const common_entity_1 = require("../../../common/entity/common.entity");
const user_entity_1 = require("../../user/user.entity");
const workManagement_entity_1 = require("../workManagement/workManagement.entity");
let AccmWorkNotificationEntity = class AccmWorkNotificationEntity extends common_entity_1.CommonEntity {
    userId;
    workManagementId;
    workManagement;
    workContent;
    user;
    userName;
    workNotification;
    workImportant;
    static _OPENAPI_METADATA_FACTORY() {
        return { userId: { required: true, type: () => Number }, workManagementId: { required: true, type: () => Number }, workManagement: { required: true, type: () => require("../workManagement/workManagement.entity").AccmWorkManagementEntity }, workContent: { required: true, type: () => String }, user: { required: true, type: () => require("../../user/user.entity").UserEntity }, userName: { required: true, type: () => String }, workNotification: { required: true, type: () => String }, workImportant: { required: true, type: () => Number } };
    }
};
exports.AccmWorkNotificationEntity = AccmWorkNotificationEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', nullable: true, comment: '员工ID' }),
    __metadata("design:type", Number)
], AccmWorkNotificationEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'work_management_id', nullable: true, comment: '工作管理Id' }),
    __metadata("design:type", Number)
], AccmWorkNotificationEntity.prototype, "workManagementId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => workManagement_entity_1.AccmWorkManagementEntity),
    (0, typeorm_1.JoinColumn)({ name: 'work_management_id' }),
    __metadata("design:type", workManagement_entity_1.AccmWorkManagementEntity)
], AccmWorkNotificationEntity.prototype, "workManagement", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], AccmWorkNotificationEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'work_notification', nullable: true, comment: '提示信息' }),
    __metadata("design:type", String)
], AccmWorkNotificationEntity.prototype, "workNotification", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'work_important', nullable: true, comment: '工作重要等级=1为一般=2为重要' }),
    __metadata("design:type", Number)
], AccmWorkNotificationEntity.prototype, "workImportant", void 0);
exports.AccmWorkNotificationEntity = AccmWorkNotificationEntity = __decorate([
    (0, typeorm_1.Entity)('accm_work_notification')
], AccmWorkNotificationEntity);
//# sourceMappingURL=workNotification.entity.js.map