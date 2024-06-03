"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServeModule = void 0;
const common_1 = require("@nestjs/common");
const system_module_1 = require("../system.module");
const serve_controller_1 = require("./serve.controller");
const serve_service_1 = require("./serve.service");
const providers = [serve_service_1.ServeService];
let ServeModule = class ServeModule {
};
exports.ServeModule = ServeModule;
exports.ServeModule = ServeModule = __decorate([
    (0, common_1.Module)({
        imports: [(0, common_1.forwardRef)(() => system_module_1.SystemModule)],
        controllers: [serve_controller_1.ServeController],
        providers: [...providers],
        exports: [...providers],
    })
], ServeModule);
//# sourceMappingURL=serve.module.js.map