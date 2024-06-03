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
exports.DeptService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lodash_1 = require("lodash");
const typeorm_2 = require("typeorm");
const biz_exception_1 = require("../../../common/exceptions/biz.exception");
const error_code_constant_1 = require("../../../constants/error-code.constant");
const dept_entity_1 = require("./dept.entity");
const user_entity_1 = require("../../user/user.entity");
const list2tree_util_1 = require("../../../utils/list2tree.util");
let DeptService = class DeptService {
    userRepository;
    deptRepository;
    entityManager;
    constructor(userRepository, deptRepository, entityManager) {
        this.userRepository = userRepository;
        this.deptRepository = deptRepository;
        this.entityManager = entityManager;
    }
    async list() {
        return this.deptRepository.find({ order: { orderNo: 'DESC' } });
    }
    async info(id) {
        const dept = await this.deptRepository
            .createQueryBuilder('dept')
            .leftJoinAndSelect('dept.parent', 'parent')
            .where({ id })
            .getOne();
        if ((0, lodash_1.isEmpty)(dept))
            throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.DEPARTMENT_NOT_FOUND);
        return dept;
    }
    async create({ parentId, ...data }) {
        const parent = await this.deptRepository
            .createQueryBuilder('dept')
            .where({ id: parentId })
            .getOne();
        await this.deptRepository.save({
            ...data,
            parent,
        });
    }
    async update(id, { parentId, ...data }) {
        const item = await this.deptRepository
            .createQueryBuilder('dept')
            .where({ id })
            .getOne();
        const parent = await this.deptRepository
            .createQueryBuilder('dept')
            .where({ id: parentId })
            .getOne();
        await this.deptRepository.save({
            ...item,
            ...data,
            parent,
        });
    }
    async delete(id) {
        await this.deptRepository.delete(id);
    }
    async move(depts) {
        await this.entityManager.transaction(async (manager) => {
            await manager.save(depts);
        });
    }
    async countUserByDeptId(id) {
        return this.userRepository.countBy({ dept: { id } });
    }
    async countChildDept(id) {
        const item = await this.deptRepository.findOneBy({ id });
        return (await this.deptRepository.countDescendants(item)) - 1;
    }
    async getDeptTree(uid, { name }) {
        const tree = [];
        if (name) {
            const deptList = await this.deptRepository
                .createQueryBuilder('dept')
                .where('dept.name like :name', { name: `%${name}%` })
                .getMany();
            for (const dept of deptList) {
                const deptTree = await this.deptRepository.findDescendantsTree(dept);
                tree.push(deptTree);
            }
            (0, list2tree_util_1.deleteEmptyChildren)(tree);
            return tree;
        }
        const deptTree = await this.deptRepository.findTrees({
            depth: 2,
            relations: ['parent'],
        });
        (0, list2tree_util_1.deleteEmptyChildren)(deptTree);
        return deptTree;
    }
};
exports.DeptService = DeptService;
exports.DeptService = DeptService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(dept_entity_1.DeptEntity)),
    __param(2, (0, typeorm_1.InjectEntityManager)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.TreeRepository,
        typeorm_2.EntityManager])
], DeptService);
//# sourceMappingURL=dept.service.js.map