"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeptModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("../../user/user.module");
const role_module_1 = require("../role/role.module");
const dept_controller_1 = require("./dept.controller");
const dept_entity_1 = require("./dept.entity");
const dept_service_1 = require("./dept.service");
const services = [dept_service_1.DeptService];
let DeptModule = class DeptModule {
};
exports.DeptModule = DeptModule;
exports.DeptModule = DeptModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([dept_entity_1.DeptEntity]), user_module_1.UserModule, role_module_1.RoleModule],
        controllers: [dept_controller_1.DeptController],
        providers: [...services],
        exports: [typeorm_1.TypeOrmModule, ...services],
    })
], DeptModule);
//# sourceMappingURL=dept.module.js.map