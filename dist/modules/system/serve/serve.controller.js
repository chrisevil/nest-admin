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
exports.ServeController = void 0;
const openapi = require("@nestjs/swagger");
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_result_decorator_1 = require("../../../common/decorators/api-result.decorator");
const swagger_decorator_1 = require("../../../common/decorators/swagger.decorator");
const allow_anon_decorator_1 = require("../../auth/decorators/allow-anon.decorator");
const serve_model_1 = require("./serve.model");
const serve_service_1 = require("./serve.service");
let ServeController = class ServeController {
    serveService;
    constructor(serveService) {
        this.serveService = serveService;
    }
    async stat() {
        return this.serveService.getServeStat();
    }
};
exports.ServeController = ServeController;
__decorate([
    (0, common_1.Get)('stat'),
    (0, swagger_1.ApiOperation)({ summary: '获取服务器运行信息' }),
    (0, api_result_decorator_1.ApiResult)({ type: serve_model_1.ServeStatInfo }),
    (0, allow_anon_decorator_1.AllowAnon)(),
    openapi.ApiResponse({ status: 200, type: require("./serve.model").ServeStatInfo }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServeController.prototype, "stat", null);
exports.ServeController = ServeController = __decorate([
    (0, swagger_1.ApiTags)('System - 服务监控'),
    (0, swagger_decorator_1.ApiSecurityAuth)(),
    (0, swagger_1.ApiExtraModels)(serve_model_1.ServeStatInfo),
    (0, common_1.Controller)('serve'),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    (0, cache_manager_1.CacheKey)('serve_stat'),
    (0, cache_manager_1.CacheTTL)(10000),
    __metadata("design:paramtypes", [serve_service_1.ServeService])
], ServeController);
//# sourceMappingURL=serve.controller.js.map