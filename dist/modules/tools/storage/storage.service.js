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
exports.StorageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const paginate_1 = require("../../../helper/paginate");
const interface_1 = require("../../../helper/paginate/interface");
const storage_entity_1 = require("./storage.entity");
const user_entity_1 = require("../../user/user.entity");
const utils_1 = require("../../../utils");
let StorageService = class StorageService {
    storageRepository;
    userRepository;
    constructor(storageRepository, userRepository) {
        this.storageRepository = storageRepository;
        this.userRepository = userRepository;
    }
    async create(dto, userId) {
        await this.storageRepository.save({
            ...dto,
            userId,
        });
    }
    async delete(fileIds) {
        const items = await this.storageRepository.findByIds(fileIds);
        await this.storageRepository.delete(fileIds);
        items.forEach((el) => {
            (0, utils_1.deleteFile)(el.path);
        });
    }
    async list({ page, pageSize, name, type, size, extName, time, username, }) {
        const queryBuilder = this.storageRepository
            .createQueryBuilder('storage')
            .leftJoinAndSelect('sys_user', 'user', 'storage.user_id = user.id')
            .where({
            ...(name && { name: (0, typeorm_2.Like)(`%${name}%`) }),
            ...(type && { type }),
            ...(extName && { extName }),
            ...(size && { size: (0, typeorm_2.Between)(size[0], size[1]) }),
            ...(time && { createdAt: (0, typeorm_2.Between)(time[0], time[1]) }),
            ...(username && {
                userId: await (await this.userRepository.findOneBy({ username })).id,
            }),
        })
            .orderBy('storage.created_at', 'DESC');
        const { items, ...rest } = await (0, paginate_1.paginateRaw)(queryBuilder, {
            page,
            pageSize,
            paginationType: interface_1.PaginationTypeEnum.LIMIT_AND_OFFSET,
        });
        function formatResult(result) {
            return result.map((e) => {
                return {
                    id: e.storage_id,
                    name: e.storage_name,
                    extName: e.storage_ext_name,
                    path: e.storage_path,
                    type: e.storage_type,
                    size: e.storage_size,
                    createdAt: e.storage_created_at,
                    username: e.user_username,
                };
            });
        }
        return {
            items: formatResult(items),
            ...rest,
        };
    }
    async count() {
        return this.storageRepository.count();
    }
};
exports.StorageService = StorageService;
exports.StorageService = StorageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(storage_entity_1.Storage)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], StorageService);
//# sourceMappingURL=storage.service.js.map