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
exports.AccmWorkManagementEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const common_entity_1 = require("../../../common/entity/common.entity");
const user_entity_1 = require("../../user/user.entity");
let AccmWorkManagementEntity = class AccmWorkManagementEntity extends common_entity_1.CommonEntity {
    userId;
    user;
    userName;
    workContent;
    workStart;
    workEnd;
    workImportant;
    isCompleted;
    static _OPENAPI_METADATA_FACTORY() {
        return { userId: { required: true, type: () => Number }, user: { required: true, type: () => require("../../user/user.entity").UserEntity }, userName: { required: true, type: () => String }, workContent: { required: true, type: () => String }, workStart: { required: true, type: () => Date }, workEnd: { required: true, type: () => Date }, workImportant: { required: true, type: () => Number }, isCompleted: { required: true, type: () => Number } };
    }
};
exports.AccmWorkManagementEntity = AccmWorkManagementEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', nullable: true, comment: '员工ID' }),
    __metadata("design:type", Number)
], AccmWorkManagementEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], AccmWorkManagementEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'work_item_name', nullable: true, comment: '工作内容' }),
    __metadata("design:type", String)
], AccmWorkManagementEntity.prototype, "workContent", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'work_start', type: 'date', nullable: true, comment: '起始日期' }),
    __metadata("design:type", Date)
], AccmWorkManagementEntity.prototype, "workStart", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'work_end', type: 'date', nullable: true, comment: '结束日期' }),
    __metadata("design:type", Date)
], AccmWorkManagementEntity.prototype, "workEnd", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'work_important', nullable: true, comment: '工作重要等级=1为一般=2为重要' }),
    __metadata("design:type", Number)
], AccmWorkManagementEntity.prototype, "workImportant", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_completed', nullable: true, comment: '是否完成工作=0为否=1为是' }),
    __metadata("design:type", Number)
], AccmWorkManagementEntity.prototype, "isCompleted", void 0);
exports.AccmWorkManagementEntity = AccmWorkManagementEntity = __decorate([
    (0, typeorm_1.Entity)('accm_work_management')
], AccmWorkManagementEntity);
//# sourceMappingURL=workManagement.entity.js.map