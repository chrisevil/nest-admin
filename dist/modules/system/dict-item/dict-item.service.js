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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DictItemService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const biz_exception_1 = require("../../../common/exceptions/biz.exception");
const error_code_constant_1 = require("../../../constants/error-code.constant");
const paginate_1 = require("../../../helper/paginate");
const dict_item_entity_1 = require("./dict-item.entity");
let DictItemService = class DictItemService {
    dictItemRepository;
    constructor(dictItemRepository) {
        this.dictItemRepository = dictItemRepository;
    }
    async page({ page, pageSize, label, value, typeId, }) {
        const queryBuilder = this.dictItemRepository.createQueryBuilder('dict_item')
            .orderBy({ orderNo: 'ASC' })
            .where({
            ...(label && { label: (0, typeorm_2.Like)(`%${label}%`) }),
            ...(value && { value: (0, typeorm_2.Like)(`%${value}%`) }),
            type: {
                id: typeId,
            },
        });
        return (0, paginate_1.paginate)(queryBuilder, { page, pageSize });
    }
    async countConfigList() {
        return this.dictItemRepository.count();
    }
    async create(dto) {
        const { typeId, ...rest } = dto;
        await this.dictItemRepository.insert({
            ...rest,
            type: {
                id: typeId,
            },
        });
    }
    async update(id, dto) {
        const { typeId, ...rest } = dto;
        await this.dictItemRepository.update(id, {
            ...rest,
            type: {
                id: typeId,
            },
        });
    }
    async delete(id) {
        await this.dictItemRepository.delete(id);
    }
    async findOne(id) {
        return this.dictItemRepository.findOneBy({ id });
    }
    async isExistKey(dto) {
        const { value, typeId } = dto;
        const result = await this.dictItemRepository.findOneBy({ value, type: { id: typeId } });
        if (result)
            throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.DICT_NAME_EXISTS);
    }
};
exports.DictItemService = DictItemService;
exports.DictItemService = DictItemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(dict_item_entity_1.DictItemEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DictItemService);
//# sourceMappingURL=dict-item.service.js.map