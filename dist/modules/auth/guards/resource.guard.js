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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const lodash_1 = require("lodash");
const typeorm_1 = require("typeorm");
const biz_exception_1 = require("../../../common/exceptions/biz.exception");
const error_code_constant_1 = require("../../../constants/error-code.constant");
const auth_constant_1 = require("../auth.constant");
let ResourceGuard = class ResourceGuard {
    reflector;
    dataSource;
    constructor(reflector, dataSource) {
        this.reflector = reflector;
        this.dataSource = dataSource;
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(auth_constant_1.PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const request = context.switchToHttp().getRequest();
        const isSse = request.headers.accept === 'text/event-stream';
        if (isPublic || isSse)
            return true;
        const { user } = request;
        if (!user)
            return false;
        const { entity, condition } = this.reflector.get(auth_constant_1.RESOURCE_KEY, context.getHandler()) ?? { entity: null, condition: null };
        if (entity && !user.roles.includes(auth_constant_1.Roles.ADMIN)) {
            const repo = this.dataSource.getRepository(entity);
            const getRequestItems = (request) => {
                const { params = {}, body = {}, query = {} } = (request ?? {});
                const id = params.id ?? body.id ?? query.id;
                if (id)
                    return [id];
                const { items } = body;
                return !(0, lodash_1.isNil)(items) && (0, lodash_1.isArray)(items) ? items : [];
            };
            const items = getRequestItems(request);
            if ((0, lodash_1.isEmpty)(items))
                throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.REQUESTED_RESOURCE_NOT_FOUND);
            if (condition)
                return condition(repo, items, user);
            const recordQuery = {
                where: {
                    id: (0, typeorm_1.In)(items),
                    user: { id: user.uid },
                },
                relations: ['user'],
            };
            const records = await repo.find(recordQuery);
            if ((0, lodash_1.isEmpty)(records))
                throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.REQUESTED_RESOURCE_NOT_FOUND);
        }
        return true;
    }
};
exports.ResourceGuard = ResourceGuard;
exports.ResourceGuard = ResourceGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        typeorm_1.DataSource])
], ResourceGuard);
//# sourceMappingURL=resource.guard.js.map