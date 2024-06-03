"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamConfigModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const param_config_controller_1 = require("./param-config.controller");
const param_config_entity_1 = require("./param-config.entity");
const param_config_service_1 = require("./param-config.service");
const services = [param_config_service_1.ParamConfigService];
let ParamConfigModule = class ParamConfigModule {
};
exports.ParamConfigModule = ParamConfigModule;
exports.ParamConfigModule = ParamConfigModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([param_config_entity_1.ParamConfigEntity])],
        controllers: [param_config_controller_1.ParamConfigController],
        providers: [...services],
        exports: [typeorm_1.TypeOrmModule, ...services],
    })
], ParamConfigModule);
//# sourceMappingURL=param-config.module.js.map