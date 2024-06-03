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
exports.MenuService = void 0;
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ioredis_1 = __importDefault(require("ioredis"));
const lodash_1 = require("lodash");
const typeorm_2 = require("typeorm");
const biz_exception_1 = require("../../../common/exceptions/biz.exception");
const cache_constant_1 = require("../../../constants/cache.constant");
const error_code_constant_1 = require("../../../constants/error-code.constant");
const genRedisKey_1 = require("../../../helper/genRedisKey");
const sse_service_1 = require("../../sse/sse.service");
const menu_entity_1 = require("./menu.entity");
const utils_1 = require("../../../utils");
const role_service_1 = require("../role/role.service");
let MenuService = class MenuService {
    redis;
    menuRepository;
    roleService;
    sseService;
    constructor(redis, menuRepository, roleService, sseService) {
        this.redis = redis;
        this.menuRepository = menuRepository;
        this.roleService = roleService;
        this.sseService = sseService;
    }
    async list({ name, path, permission, component, status, }) {
        const menus = await this.menuRepository.find({
            where: {
                ...(name && { name: (0, typeorm_2.Like)(`%${name}%`) }),
                ...(path && { path: (0, typeorm_2.Like)(`%${path}%`) }),
                ...(permission && { permission: (0, typeorm_2.Like)(`%${permission}%`) }),
                ...(component && { component: (0, typeorm_2.Like)(`%${component}%`) }),
                ...(!(0, lodash_1.isNil)(status) ? { status } : null),
            },
            order: { orderNo: 'ASC' },
        });
        const menuList = (0, utils_1.generatorMenu)(menus);
        if (!(0, lodash_1.isEmpty)(menuList)) {
            (0, utils_1.deleteEmptyChildren)(menuList);
            return menuList;
        }
        return menus;
    }
    async create(menu) {
        const result = await this.menuRepository.save(menu);
        this.sseService.noticeClientToUpdateMenusByMenuIds([result.id]);
    }
    async update(id, menu) {
        await this.menuRepository.update(id, menu);
        this.sseService.noticeClientToUpdateMenusByMenuIds([id]);
    }
    async getMenus(uid) {
        const roleIds = await this.roleService.getRoleIdsByUser(uid);
        let menus = [];
        if ((0, lodash_1.isEmpty)(roleIds))
            return (0, utils_1.generatorRouters)([]);
        if (this.roleService.hasAdminRole(roleIds)) {
            menus = await this.menuRepository.find({ order: { orderNo: 'ASC' } });
        }
        else {
            menus = await this.menuRepository
                .createQueryBuilder('menu')
                .innerJoinAndSelect('menu.roles', 'role')
                .andWhere('role.id IN (:...roleIds)', { roleIds })
                .orderBy('menu.order_no', 'ASC')
                .getMany();
        }
        const menuList = (0, utils_1.generatorRouters)(menus);
        return menuList;
    }
    async check(dto) {
        if (dto.type === 2 && !dto.parentId) {
            throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.PERMISSION_REQUIRES_PARENT);
        }
        if (dto.type === 1 && dto.parentId) {
            const parent = await this.getMenuItemInfo(dto.parentId);
            if ((0, lodash_1.isEmpty)(parent))
                throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.PARENT_MENU_NOT_FOUND);
            if (parent && parent.type === 1) {
                throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.ILLEGAL_OPERATION_DIRECTORY_PARENT);
            }
        }
    }
    async findChildMenus(mid) {
        const allMenus = [];
        const menus = await this.menuRepository.findBy({ parentId: mid });
        for (const menu of menus) {
            if (menu.type !== 2) {
                const c = await this.findChildMenus(menu.id);
                allMenus.push(c);
            }
            allMenus.push(menu.id);
        }
        return allMenus;
    }
    async getMenuItemInfo(mid) {
        const menu = await this.menuRepository.findOneBy({ id: mid });
        return menu;
    }
    async getMenuItemAndParentInfo(mid) {
        const menu = await this.menuRepository.findOneBy({ id: mid });
        let parentMenu;
        if (menu && menu.parentId)
            parentMenu = await this.menuRepository.findOneBy({ id: menu.parentId });
        return { menu, parentMenu };
    }
    async findRouterExist(path) {
        const menus = await this.menuRepository.findOneBy({ path });
        return !(0, lodash_1.isEmpty)(menus);
    }
    async getPermissions(uid) {
        const roleIds = await this.roleService.getRoleIdsByUser(uid);
        let permission = [];
        let result = null;
        if (this.roleService.hasAdminRole(roleIds)) {
            result = await this.menuRepository.findBy({
                permission: (0, typeorm_2.Not)((0, typeorm_2.IsNull)()),
                type: (0, typeorm_2.In)([1, 2]),
            });
        }
        else {
            if ((0, lodash_1.isEmpty)(roleIds))
                return permission;
            result = await this.menuRepository
                .createQueryBuilder('menu')
                .innerJoinAndSelect('menu.roles', 'role')
                .andWhere('role.id IN (:...roleIds)', { roleIds })
                .andWhere('menu.type IN (1,2)')
                .andWhere('menu.permission IS NOT NULL')
                .getMany();
        }
        if (!(0, lodash_1.isEmpty)(result)) {
            result.forEach((e) => {
                if (e.permission)
                    permission = (0, lodash_1.concat)(permission, e.permission.split(','));
            });
            permission = (0, lodash_1.uniq)(permission);
        }
        return permission;
    }
    async deleteMenuItem(mids) {
        await this.menuRepository.delete(mids);
    }
    async refreshPerms(uid) {
        const perms = await this.getPermissions(uid);
        const online = await this.redis.get((0, genRedisKey_1.genAuthTokenKey)(uid));
        if (online) {
            await this.redis.set((0, genRedisKey_1.genAuthPermKey)(uid), JSON.stringify(perms));
            console.log('refreshPerms');
            this.sseService.noticeClientToUpdateMenusByUserIds([uid]);
        }
    }
    async refreshOnlineUserPerms(isNoticeUser = true) {
        const onlineUserIds = await this.redis.keys((0, genRedisKey_1.genAuthTokenKey)('*'));
        if (onlineUserIds && onlineUserIds.length > 0) {
            const promiseArr = onlineUserIds
                .map(i => Number.parseInt(i.split(cache_constant_1.RedisKeys.AUTH_TOKEN_PREFIX)[1]))
                .filter(i => i)
                .map(async (uid) => {
                const perms = await this.getPermissions(uid);
                await this.redis.set((0, genRedisKey_1.genAuthPermKey)(uid), JSON.stringify(perms));
                return uid;
            });
            const uids = await Promise.all(promiseArr);
            console.log('refreshOnlineUserPerms');
            if (isNoticeUser)
                this.sseService.noticeClientToUpdateMenusByUserIds(uids);
        }
    }
    async checkRoleByMenuId(id) {
        return !!(await this.menuRepository.findOne({
            where: {
                roles: {
                    id,
                },
            },
        }));
    }
};
exports.MenuService = MenuService;
exports.MenuService = MenuService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_redis_1.InjectRedis)()),
    __param(1, (0, typeorm_1.InjectRepository)(menu_entity_1.MenuEntity)),
    __metadata("design:paramtypes", [ioredis_1.default,
        typeorm_2.Repository,
        role_service_1.RoleService,
        sse_service_1.SseService])
], MenuService);
//# sourceMappingURL=menu.service.js.map