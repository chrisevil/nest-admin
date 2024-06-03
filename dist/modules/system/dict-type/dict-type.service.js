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
exports.DictTypeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const biz_exception_1 = require("../../../common/exceptions/biz.exception");
const error_code_constant_1 = require("../../../constants/error-code.constant");
const paginate_1 = require("../../../helper/paginate");
const dict_type_entity_1 = require("./dict-type.entity");
let DictTypeService = class DictTypeService {
    dictTypeRepository;
    constructor(dictTypeRepository) {
        this.dictTypeRepository = dictTypeRepository;
    }
    async page({ page, pageSize, name, code, }) {
        const queryBuilder = this.dictTypeRepository.createQueryBuilder('dict_type')
            .where({
            ...(name && { name: (0, typeorm_2.Like)(`%${name}%`) }),
            ...(code && { code: (0, typeorm_2.Like)(`%${code}%`) }),
        });
        return (0, paginate_1.paginate)(queryBuilder, { page, pageSize });
    }
    async getAll() {
        return this.dictTypeRepository.find();
    }
    async countConfigList() {
        return this.dictTypeRepository.count();
    }
    async create(dto) {
        await this.dictTypeRepository.insert(dto);
    }
    async update(id, dto) {
        await this.dictTypeRepository.update(id, dto);
    }
    async delete(id) {
        await this.dictTypeRepository.delete(id);
    }
    async findOne(id) {
        return this.dictTypeRepository.findOneBy({ id });
    }
    async isExistKey(name) {
        const result = await this.dictTypeRepository.findOneBy({ name });
        if (result)
            throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.DICT_NAME_EXISTS);
    }
};
exports.DictTypeService = DictTypeService;
exports.DictTypeService = DictTypeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(dict_type_entity_1.DictTypeEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DictTypeService);
//# sourceMappingURL=dict-type.service.js.map