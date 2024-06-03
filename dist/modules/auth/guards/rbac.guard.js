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
exports.RbacGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const biz_exception_1 = require("../../../common/exceptions/biz.exception");
const error_code_constant_1 = require("../../../constants/error-code.constant");
const auth_service_1 = require("../auth.service");
const auth_constant_1 = require("../auth.constant");
let RbacGuard = class RbacGuard {
    reflector;
    authService;
    constructor(reflector, authService) {
        this.reflector = reflector;
        this.authService = authService;
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(auth_constant_1.PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic)
            return true;
        const request = context.switchToHttp().getRequest();
        const { user } = request;
        if (!user)
            throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.INVALID_LOGIN);
        const allowAnon = this.reflector.get(auth_constant_1.ALLOW_ANON_KEY, context.getHandler());
        if (allowAnon)
            return true;
        const payloadPermission = this.reflector.getAllAndOverride(auth_constant_1.PERMISSION_KEY, [context.getHandler(), context.getClass()]);
        if (!payloadPermission)
            return true;
        if (user.roles.includes(auth_constant_1.Roles.ADMIN))
            return true;
        const allPermissions = await this.authService.getPermissionsCache(user.uid) ?? await this.authService.getPermissions(user.uid);
        let canNext = false;
        if (Array.isArray(payloadPermission)) {
            canNext = payloadPermission.every(i => allPermissions.includes(i));
        }
        if (typeof payloadPermission === 'string')
            canNext = allPermissions.includes(payloadPermission);
        if (!canNext)
            throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.NO_PERMISSION);
        return true;
    }
};
exports.RbacGuard = RbacGuard;
exports.RbacGuard = RbacGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        auth_service_1.AuthService])
], RbacGuard);
//# sourceMappingURL=rbac.guard.js.map