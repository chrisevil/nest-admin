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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCrudFactory = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const lodash_1 = require("lodash");
const pluralize_1 = __importDefault(require("pluralize"));
const api_result_decorator_1 = require("../../common/decorators/api-result.decorator");
const id_param_decorator_1 = require("../../common/decorators/id-param.decorator");
const pager_dto_1 = require("../../common/dto/pager.dto");
function BaseCrudFactory({ entity, dto, permissions }) {
    const prefix = entity.name.toLowerCase().replace(/entity$/, '');
    const pluralizeName = (0, pluralize_1.default)(prefix);
    dto = dto ?? class extends entity {
    };
    class Dto extends dto {
        static name = (0, lodash_1.upperFirst)(`${pluralizeName}Dto`);
    }
    class UpdateDto extends (0, swagger_1.PartialType)(Dto) {
        static name = (0, lodash_1.upperFirst)(`${pluralizeName}UpdateDto`);
    }
    class QueryDto extends (0, swagger_1.IntersectionType)(pager_dto_1.PagerDto, (0, swagger_1.PartialType)(Dto)) {
        static name = (0, lodash_1.upperFirst)(`${pluralizeName}QueryDto`);
    }
    permissions = permissions ?? {
        LIST: `${prefix}:list`,
        CREATE: `${prefix}:create`,
        READ: `${prefix}:read`,
        UPDATE: `${prefix}:update`,
        DELETE: `${prefix}:delete`,
    };
    let BaseController = class BaseController {
        service;
        constructor(service) {
            this.service = service;
        }
        async list(pager) {
            console.log('BaseController -> list -> pager', pager);
            return await this.service.list(pager);
        }
        async get(id) {
            return await this.service.findOne(id);
        }
        async create(dto) {
            return await this.service.create(dto);
        }
        async update(id, dto) {
            try {
                return await this.service.update(id, dto);
            }
            catch (e) {
                console.log(e);
                throw new Error('更新失败');
            }
        }
        async patch(id, dto) {
            await this.service.update(id, dto);
        }
        async delete(id) {
            await this.service.delete(id);
        }
    };
    __decorate([
        (0, common_1.Get)(),
        (0, api_result_decorator_1.ApiResult)({ type: [entity], isPage: true }),
        __param(0, (0, common_1.Query)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [QueryDto]),
        __metadata("design:returntype", Promise)
    ], BaseController.prototype, "list", null);
    __decorate([
        (0, common_1.Get)(':id'),
        (0, api_result_decorator_1.ApiResult)({ type: entity }),
        __param(0, (0, id_param_decorator_1.IdParam)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", Promise)
    ], BaseController.prototype, "get", null);
    __decorate([
        (0, common_1.Post)(),
        (0, swagger_1.ApiBody)({ type: dto }),
        __param(0, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Dto]),
        __metadata("design:returntype", Promise)
    ], BaseController.prototype, "create", null);
    __decorate([
        (0, common_1.Put)(':id'),
        __param(0, (0, id_param_decorator_1.IdParam)()),
        __param(1, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, UpdateDto]),
        __metadata("design:returntype", Promise)
    ], BaseController.prototype, "update", null);
    __decorate([
        (0, common_1.Patch)(':id'),
        __param(0, (0, id_param_decorator_1.IdParam)()),
        __param(1, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, UpdateDto]),
        __metadata("design:returntype", Promise)
    ], BaseController.prototype, "patch", null);
    __decorate([
        (0, common_1.Delete)(':id'),
        __param(0, (0, id_param_decorator_1.IdParam)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", Promise)
    ], BaseController.prototype, "delete", null);
    BaseController = __decorate([
        (0, common_1.Controller)(pluralizeName),
        __metadata("design:paramtypes", [Object])
    ], BaseController);
    return BaseController;
}
exports.BaseCrudFactory = BaseCrudFactory;
//# sourceMappingURL=crud.factory.js.map