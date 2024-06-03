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
exports.OnlineQueryDto = exports.KickDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const pager_dto_1 = require("../../../common/dto/pager.dto");
class KickDto {
    tokenId;
    static _OPENAPI_METADATA_FACTORY() {
        return { tokenId: { required: true, type: () => String } };
    }
}
exports.KickDto = KickDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'tokenId' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], KickDto.prototype, "tokenId", void 0);
class OnlineQueryDto extends pager_dto_1.PagerDto {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.OnlineQueryDto = OnlineQueryDto;
//# sourceMappingURL=online.dto.js.map