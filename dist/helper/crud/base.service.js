"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const common_1 = require("@nestjs/common");
const paginate_1 = require("../paginate");
class BaseService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async list({ page, pageSize, field, order, ...query }) {
        console.log('BaseService -> list -> query', query);
        const searchOptions = {
            where: query,
            order: field && order ? { [field]: order } : undefined,
        };
        return (0, paginate_1.paginate)(this.repository, { page, pageSize }, searchOptions);
    }
    async findOne(id) {
        const item = await this.repository.createQueryBuilder().where({ id }).getOne();
        if (!item)
            throw new common_1.NotFoundException('未找到该记录');
        return item;
    }
    async create(dto) {
        return await this.repository.save(dto);
    }
    async update(id, dto) {
        await this.repository.update(id, dto);
    }
    async delete(id) {
        const item = await this.findOne(id);
        await this.repository.remove(item);
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map