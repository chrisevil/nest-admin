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
exports.EmailSendDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class EmailSendDto {
    to;
    subject;
    content;
    static _OPENAPI_METADATA_FACTORY() {
        return { to: { required: true, type: () => String }, subject: { required: true, type: () => String }, content: { required: true, type: () => String } };
    }
}
exports.EmailSendDto = EmailSendDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '收件人邮箱' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], EmailSendDto.prototype, "to", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '标题' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmailSendDto.prototype, "subject", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '正文' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmailSendDto.prototype, "content", void 0);
//# sourceMappingURL=email.dto.js.map