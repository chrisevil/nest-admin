"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskQueryDto = exports.TaskUpdateDto = exports.TaskDto = exports.IsCronExpression = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const parser = __importStar(require("cron-parser"));
const lodash_1 = require("lodash");
const pager_dto_1 = require("../../../common/dto/pager.dto");
let IsCronExpression = class IsCronExpression {
    validate(value, _args) {
        try {
            if ((0, lodash_1.isEmpty)(value))
                throw new common_1.BadRequestException('cron expression is empty');
            parser.parseExpression(value);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    defaultMessage(_args) {
        return 'this cron expression ($value) invalid';
    }
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
};
exports.IsCronExpression = IsCronExpression;
exports.IsCronExpression = IsCronExpression = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'isCronExpression', async: false })
], IsCronExpression);
class TaskDto {
    name;
    service;
    type;
    status;
    startTime;
    endTime;
    limit = -1;
    cron;
    every;
    data;
    remark;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, minLength: 2, maxLength: 50 }, service: { required: true, type: () => String, minLength: 1 }, type: { required: true, type: () => Number, enum: [0, 1] }, status: { required: true, type: () => Number, enum: [0, 1] }, startTime: { required: true, type: () => String }, endTime: { required: true, type: () => String }, limit: { required: false, type: () => Number, default: -1 }, cron: { required: true, type: () => String }, every: { required: false, type: () => Number, minimum: 100 }, data: { required: false, type: () => String }, remark: { required: false, type: () => String } };
    }
}
exports.TaskDto = TaskDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '任务名称' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], TaskDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '调用的服务' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], TaskDto.prototype, "service", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '任务类别：cron | interval' }),
    (0, class_validator_1.IsIn)([0, 1]),
    __metadata("design:type", Number)
], TaskDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '任务状态' }),
    (0, class_validator_1.IsIn)([0, 1]),
    __metadata("design:type", Number)
], TaskDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '开始时间', type: Date }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.ValidateIf)(o => !(0, lodash_1.isEmpty)(o.startTime)),
    __metadata("design:type", String)
], TaskDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '结束时间', type: Date }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.ValidateIf)(o => !(0, lodash_1.isEmpty)(o.endTime)),
    __metadata("design:type", String)
], TaskDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '限制执行次数，负数则无限制',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], TaskDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'cron表达式' }),
    (0, class_validator_1.Validate)(IsCronExpression),
    (0, class_validator_1.ValidateIf)(o => o.type === 0),
    __metadata("design:type", String)
], TaskDto.prototype, "cron", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '执行间隔，毫秒单位' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(100),
    (0, class_validator_1.ValidateIf)(o => o.type === 1),
    __metadata("design:type", Number)
], TaskDto.prototype, "every", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '执行参数' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaskDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '任务备注' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaskDto.prototype, "remark", void 0);
class TaskUpdateDto extends (0, swagger_1.PartialType)(TaskDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.TaskUpdateDto = TaskUpdateDto;
class TaskQueryDto extends (0, swagger_1.IntersectionType)(pager_dto_1.PagerDto, (0, swagger_1.PartialType)(TaskDto)) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.TaskQueryDto = TaskQueryDto;
//# sourceMappingURL=task.dto.js.map