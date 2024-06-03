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
exports.accmWorkManagementQueryDto = exports.accmWorkManagementDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class accmWorkManagementDto {
    userId;
    workContent;
    workStart;
    workEnd;
    workImportant;
    isCompleted;
    static _OPENAPI_METADATA_FACTORY() {
        return { userId: { required: false, type: () => Number }, workContent: { required: false, type: () => String }, workStart: { required: false, type: () => Date }, workEnd: { required: false, type: () => Date }, workImportant: { required: false, type: () => Number }, isCompleted: { required: false, type: () => Number } };
    }
}
exports.accmWorkManagementDto = accmWorkManagementDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '员工ID' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], accmWorkManagementDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '工作内容' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], accmWorkManagementDto.prototype, "workContent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '起始日期' }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], accmWorkManagementDto.prototype, "workStart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '结束日期' }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], accmWorkManagementDto.prototype, "workEnd", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '工作重要等级' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], accmWorkManagementDto.prototype, "workImportant", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '是否完成工作=0为否=1为是' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], accmWorkManagementDto.prototype, "isCompleted", void 0);
class accmWorkManagementQueryDto {
    userName;
    workContent;
    workStart;
    workEnd;
    workImportant;
    isCompleted;
    static _OPENAPI_METADATA_FACTORY() {
        return { userName: { required: false, type: () => String }, workContent: { required: false, type: () => String }, workStart: { required: false, type: () => Date }, workEnd: { required: false, type: () => Date }, workImportant: { required: false, type: () => Number }, isCompleted: { required: false, type: () => Number } };
    }
}
exports.accmWorkManagementQueryDto = accmWorkManagementQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '员工姓名' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], accmWorkManagementQueryDto.prototype, "userName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '工作内容' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], accmWorkManagementQueryDto.prototype, "workContent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '起始日期' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], accmWorkManagementQueryDto.prototype, "workStart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '结束日期' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], accmWorkManagementQueryDto.prototype, "workEnd", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '工作重要等级=1为一般=2为重要' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], accmWorkManagementQueryDto.prototype, "workImportant", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '是否完成工作=0为否=1为是' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], accmWorkManagementQueryDto.prototype, "isCompleted", void 0);
//# sourceMappingURL=workManagement.dto.js.map