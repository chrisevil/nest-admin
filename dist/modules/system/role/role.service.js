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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lodash_1 = require("lodash");
const typeorm_2 = require("typeorm");
const system_constant_1 = require("../../../constants/system.constant");
const paginate_1 = require("../../../helper/paginate");
const menu_entity_1 = require("../menu/menu.entity");
const role_entity_1 = require("./role.entity");
let RoleService = class RoleService {
    roleRepository;
    menuRepository;
    entityManager;
    constructor(roleRepository, menuRepository, entityManager) {
        this.roleRepository = roleRepository;
        this.menuRepository = menuRepository;
        this.entityManager = entityManager;
    }
    async findAll({ page, pageSize, }) {
        return (0, paginate_1.paginate)(this.roleRepository, { page, pageSize });
    }
    async list({ page, pageSize, name, value, remark, status, }) {
        const queryBuilder = await this.roleRepository
            .createQueryBuilder('role')
            .where({
            ...(name ? { name: (0, typeorm_2.Like)(`%${name}%`) } : null),
            ...(value ? { value: (0, typeorm_2.Like)(`%${value}%`) } : null),
            ...(remark ? { remark: (0, typeorm_2.Like)(`%${remark}%`) } : null),
            ...(!(0, lodash_1.isNil)(status) ? { status } : null),
        });
        return (0, paginate_1.paginate)(queryBuilder, {
            page,
            pageSize,
        });
    }
    async info(id) {
        const info = await this.roleRepository
            .createQueryBuilder('role')
            .where({
            id,
        })
            .getOne();
        const menus = await this.menuRepository.find({
            where: { roles: { id } },
            select: ['id'],
        });
        return { ...info, menuIds: menus.map(m => m.id) };
    }
    async delete(id) {
        if (id === system_constant_1.ROOT_ROLE_ID)
            throw new Error('不能删除超级管理员');
        await this.roleRepository.delete(id);
    }
    async create({ menuIds, ...data }) {
        const role = await this.roleRepository.save({
            ...data,
            menus: menuIds
                ? await this.menuRepository.findBy({ id: (0, typeorm_2.In)(menuIds) })
                : [],
        });
        return { roleId: role.id };
    }
    async update(id, { menuIds, ...data }) {
        await this.roleRepository.update(id, data);
        await this.entityManager.transaction(async (manager) => {
            const role = await this.roleRepository.findOne({ where: { id } });
            role.menus = menuIds?.length
                ? await this.menuRepository.findBy({ id: (0, typeorm_2.In)(menuIds) })
                : [];
            await manager.save(role);
        });
    }
    async getRoleIdsByUser(id) {
        const roles = await this.roleRepository.find({
            where: {
                users: { id },
            },
        });
        if (!(0, lodash_1.isEmpty)(roles))
            return roles.map(r => r.id);
        return [];
    }
    async getRoleValues(ids) {
        return (await this.roleRepository.findBy({
            id: (0, typeorm_2.In)(ids),
        })).map(r => r.value);
    }
    async isAdminRoleByUser(uid) {
        const roles = await this.roleRepository.find({
            where: {
                users: { id: uid },
            },
        });
        if (!(0, lodash_1.isEmpty)(roles)) {
            return roles.some(r => r.id === system_constant_1.ROOT_ROLE_ID);
        }
        return false;
    }
    hasAdminRole(rids) {
        return rids.includes(system_constant_1.ROOT_ROLE_ID);
    }
    async checkUserByRoleId(id) {
        return this.roleRepository.exist({
            where: {
                users: {
                    roles: { id },
                },
            },
        });
    }
};
exports.RoleService = RoleService;
exports.RoleService = RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.RoleEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(menu_entity_1.MenuEntity)),
    __param(2, (0, typeorm_1.InjectEntityManager)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.EntityManager])
], RoleService);
//# sourceMappingURL=role.service.js.map