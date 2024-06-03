"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../modules/auth/auth.module");
const system_module_1 = require("../modules/system/system.module");
const admin_gateway_1 = require("./events/admin.gateway");
const web_gateway_1 = require("./events/web.gateway");
const providers = [admin_gateway_1.AdminEventsGateway, web_gateway_1.WebEventsGateway];
let SocketModule = class SocketModule {
};
exports.SocketModule = SocketModule;
exports.SocketModule = SocketModule = __decorate([
    (0, common_1.Module)({
        imports: [(0, common_1.forwardRef)(() => system_module_1.SystemModule), auth_module_1.AuthModule],
        providers,
        exports: [...providers],
    })
], SocketModule);
//# sourceMappingURL=socket.module.js.map