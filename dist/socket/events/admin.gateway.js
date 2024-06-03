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
exports.AdminEventsGateway = void 0;
const jwt_1 = require("@nestjs/jwt");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const auth_service_1 = require("../../modules/auth/auth.service");
const cache_service_1 = require("../../shared/redis/cache.service");
const auth_gateway_1 = require("../shared/auth.gateway");
const AuthGateway = (0, auth_gateway_1.createAuthGateway)({ namespace: 'admin' });
let AdminEventsGateway = class AdminEventsGateway extends AuthGateway {
    jwtService;
    authService;
    cacheService;
    constructor(jwtService, authService, cacheService) {
        super(jwtService, authService, cacheService);
        this.jwtService = jwtService;
        this.authService = authService;
        this.cacheService = cacheService;
    }
    _server;
    get server() {
        return this._server;
    }
};
exports.AdminEventsGateway = AdminEventsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AdminEventsGateway.prototype, "_server", void 0);
exports.AdminEventsGateway = AdminEventsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ namespace: 'admin' }),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        auth_service_1.AuthService,
        cache_service_1.CacheService])
], AdminEventsGateway);
//# sourceMappingURL=admin.gateway.js.map