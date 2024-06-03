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
exports.ParamConfigService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const biz_exception_1 = require("../../../common/exceptions/biz.exception");
const error_code_constant_1 = require("../../../constants/error-code.constant");
const paginate_1 = require("../../../helper/paginate");
const param_config_entity_1 = require("./param-config.entity");
let ParamConfigService = class ParamConfigService {
    paramConfigRepository;
    constructor(paramConfigRepository) {
        this.paramConfigRepository = paramConfigRepository;
    }
    async page({ page, pageSize, name, }) {
        const queryBuilder = this.paramConfigRepository.createQueryBuilder('config');
        if (name) {
            queryBuilder.where('config.name LIKE :name', {
                name: `%${name}%`,
            });
        }
        return (0, paginate_1.paginate)(queryBuilder, { page, pageSize });
    }
    async countConfigList() {
        return this.paramConfigRepository.count();
    }
    async create(dto) {
        await this.paramConfigRepository.insert(dto);
    }
    async update(id, dto) {
        await this.paramConfigRepository.update(id, dto);
    }
    async delete(id) {
        await this.paramConfigRepository.delete(id);
    }
    async findOne(id) {
        return this.paramConfigRepository.findOneBy({ id });
    }
    async isExistKey(key) {
        const result = await this.paramConfigRepository.findOneBy({ key });
        if (result)
            throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.PARAMETER_CONFIG_KEY_EXISTS);
    }
    async findValueByKey(key) {
        const result = await this.paramConfigRepository.findOne({
            where: { key },
            select: ['value'],
        });
        if (result)
            return result.value;
        return null;
    }
};
exports.ParamConfigService = ParamConfigService;
exports.ParamConfigService = ParamConfigService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(param_config_entity_1.ParamConfigEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ParamConfigService);
//# sourceMappingURL=param-config.service.js.map