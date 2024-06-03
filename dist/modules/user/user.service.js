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
exports.UserService = void 0;
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ioredis_1 = __importDefault(require("ioredis"));
const lodash_1 = require("lodash");
const typeorm_2 = require("typeorm");
const biz_exception_1 = require("../../common/exceptions/biz.exception");
const error_code_constant_1 = require("../../constants/error-code.constant");
const system_constant_1 = require("../../constants/system.constant");
const genRedisKey_1 = require("../../helper/genRedisKey");
const paginate_1 = require("../../helper/paginate");
const qq_service_1 = require("../../shared/helper/qq.service");
const utils_1 = require("../../utils");
const access_token_entity_1 = require("../auth/entities/access-token.entity");
const dept_entity_1 = require("../system/dept/dept.entity");
const param_config_service_1 = require("../system/param-config/param-config.service");
const role_entity_1 = require("../system/role/role.entity");
const constant_1 = require("./constant");
const user_entity_1 = require("./user.entity");
let UserService = class UserService {
    redis;
    userRepository;
    roleRepository;
    entityManager;
    paramConfigService;
    qqService;
    constructor(redis, userRepository, roleRepository, entityManager, paramConfigService, qqService) {
        this.redis = redis;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.entityManager = entityManager;
        this.paramConfigService = paramConfigService;
        this.qqService = qqService;
    }
    async findUserById(id) {
        return this.userRepository
            .createQueryBuilder('user')
            .where({
            id,
            status: constant_1.UserStatus.Enabled,
        })
            .getOne();
    }
    async findUserByUserName(username) {
        return this.userRepository
            .createQueryBuilder('user')
            .where({
            username,
            status: constant_1.UserStatus.Enabled,
        })
            .getOne();
    }
    async getAccountInfo(uid) {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.roles', 'role')
            .where(`user.id = :uid`, { uid })
            .getOne();
        if ((0, lodash_1.isEmpty)(user))
            throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.USER_NOT_FOUND);
        delete user?.psalt;
        return user;
    }
    async updateAccountInfo(uid, info) {
        const user = await this.userRepository.findOneBy({ id: uid });
        if ((0, lodash_1.isEmpty)(user))
            throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.USER_NOT_FOUND);
        const data = {
            ...(info.nickname ? { nickname: info.nickname } : null),
            ...(info.avatar ? { avatar: info.avatar } : null),
            ...(info.email ? { email: info.email } : null),
            ...(info.phone ? { phone: info.phone } : null),
            ...(info.qq ? { qq: info.qq } : null),
            ...(info.remark ? { remark: info.remark } : null),
        };
        if (!info.avatar && info.qq) {
            if (info.qq !== user.qq)
                data.avatar = await this.qqService.getAvater(info.qq);
        }
        await this.userRepository.update(uid, data);
    }
    async updatePassword(uid, dto) {
        const user = await this.userRepository.findOneBy({ id: uid });
        if ((0, lodash_1.isEmpty)(user))
            throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.USER_NOT_FOUND);
        const comparePassword = (0, utils_1.md5)(`${dto.oldPassword}${user.psalt}`);
        if (user.password !== comparePassword)
            throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.PASSWORD_MISMATCH);
        const password = (0, utils_1.md5)(`${dto.newPassword}${user.psalt}`);
        await this.userRepository.update({ id: uid }, { password });
        await this.upgradePasswordV(user.id);
    }
    async forceUpdatePassword(uid, password) {
        const user = await this.userRepository.findOneBy({ id: uid });
        const newPassword = (0, utils_1.md5)(`${password}${user.psalt}`);
        await this.userRepository.update({ id: uid }, { password: newPassword });
        await this.upgradePasswordV(user.id);
    }
    async create({ username, password, roleIds, deptId, ...data }) {
        const exists = await this.userRepository.findOneBy({
            username,
        });
        if (!(0, lodash_1.isEmpty)(exists))
            throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.SYSTEM_USER_EXISTS);
        await this.entityManager.transaction(async (manager) => {
            const salt = (0, utils_1.randomValue)(32);
            if (!password) {
                const initPassword = await this.paramConfigService.findValueByKey(system_constant_1.SYS_USER_INITPASSWORD);
                password = (0, utils_1.md5)(`${initPassword ?? '123456'}${salt}`);
            }
            else {
                password = (0, utils_1.md5)(`${password ?? '123456'}${salt}`);
            }
            const u = manager.create(user_entity_1.UserEntity, {
                username,
                password,
                ...data,
                psalt: salt,
                roles: await this.roleRepository.findBy({ id: (0, typeorm_2.In)(roleIds) }),
                dept: await dept_entity_1.DeptEntity.findOneBy({ id: deptId }),
            });
            const result = await manager.save(u);
            return result;
        });
    }
    async update(id, { password, deptId, roleIds, status, ...data }) {
        await this.entityManager.transaction(async (manager) => {
            if (password)
                await this.forceUpdatePassword(id, password);
            await manager.update(user_entity_1.UserEntity, id, {
                ...data,
                status,
            });
            const user = await this.userRepository
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.roles', 'roles')
                .leftJoinAndSelect('user.dept', 'dept')
                .where('user.id = :id', { id })
                .getOne();
            if (roleIds) {
                await manager
                    .createQueryBuilder()
                    .relation(user_entity_1.UserEntity, 'roles')
                    .of(id)
                    .addAndRemove(roleIds, user.roles);
            }
            if (deptId) {
                await manager
                    .createQueryBuilder()
                    .relation(user_entity_1.UserEntity, 'dept')
                    .of(id)
                    .set(deptId);
            }
            if (status === 0) {
                await this.forbidden(id);
            }
        });
    }
    async info(id) {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.roles', 'roles')
            .leftJoinAndSelect('user.dept', 'dept')
            .where('user.id = :id', { id })
            .getOne();
        delete user.password;
        delete user.psalt;
        return user;
    }
    async delete(userIds) {
        const rootUserId = await this.findRootUserId();
        if (userIds.includes(rootUserId))
            throw new common_1.BadRequestException('不能删除root用户!');
        await this.userRepository.delete(userIds);
    }
    async findRootUserId() {
        const user = await this.userRepository.findOneBy({
            roles: { id: system_constant_1.ROOT_ROLE_ID },
        });
        return user.id;
    }
    async list({ page, pageSize, username, nickname, deptId, email, status, }) {
        const queryBuilder = this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.dept', 'dept')
            .leftJoinAndSelect('user.roles', 'role')
            .where({
            ...(username ? { username: (0, typeorm_2.Like)(`%${username}%`) } : null),
            ...(nickname ? { nickname: (0, typeorm_2.Like)(`%${nickname}%`) } : null),
            ...(email ? { email: (0, typeorm_2.Like)(`%${email}%`) } : null),
            ...(!(0, lodash_1.isNil)(status) ? { status } : null),
        });
        if (deptId)
            queryBuilder.andWhere('dept.id = :deptId', { deptId });
        return (0, paginate_1.paginate)(queryBuilder, {
            page,
            pageSize,
        });
    }
    async forbidden(uid, accessToken) {
        await this.redis.del((0, genRedisKey_1.genAuthPVKey)(uid));
        await this.redis.del((0, genRedisKey_1.genAuthTokenKey)(uid));
        await this.redis.del((0, genRedisKey_1.genAuthPermKey)(uid));
        if (accessToken) {
            const token = await access_token_entity_1.AccessTokenEntity.findOne({
                where: { value: accessToken },
            });
            this.redis.del((0, genRedisKey_1.genOnlineUserKey)(token.id));
        }
    }
    async multiForbidden(uids) {
        if (uids) {
            const pvs = [];
            const ts = [];
            const ps = [];
            uids.forEach((uid) => {
                pvs.push((0, genRedisKey_1.genAuthPVKey)(uid));
                ts.push((0, genRedisKey_1.genAuthTokenKey)(uid));
                ps.push((0, genRedisKey_1.genAuthPermKey)(uid));
            });
            await this.redis.del(pvs);
            await this.redis.del(ts);
            await this.redis.del(ps);
        }
    }
    async upgradePasswordV(id) {
        const v = await this.redis.get((0, genRedisKey_1.genAuthPVKey)(id));
        if (!(0, lodash_1.isEmpty)(v))
            await this.redis.set((0, genRedisKey_1.genAuthPVKey)(id), Number.parseInt(v) + 1);
    }
    async exist(username) {
        const user = await this.userRepository.findOneBy({ username });
        if ((0, lodash_1.isNil)(user))
            throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.SYSTEM_USER_EXISTS);
        return true;
    }
    async register({ username, ...data }) {
        const exists = await this.userRepository.findOneBy({
            username,
        });
        if (!(0, lodash_1.isEmpty)(exists))
            throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.SYSTEM_USER_EXISTS);
        await this.entityManager.transaction(async (manager) => {
            const salt = (0, utils_1.randomValue)(32);
            const password = (0, utils_1.md5)(`${data.password ?? 'a123456'}${salt}`);
            const u = manager.create(user_entity_1.UserEntity, {
                username,
                password,
                status: 1,
                psalt: salt,
            });
            const user = await manager.save(u);
            return user;
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_redis_1.InjectRedis)()),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(role_entity_1.RoleEntity)),
    __param(3, (0, typeorm_1.InjectEntityManager)()),
    __metadata("design:paramtypes", [ioredis_1.default,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.EntityManager,
        param_config_service_1.ParamConfigService,
        qq_service_1.QQService])
], UserService);
//# sourceMappingURL=user.service.js.map