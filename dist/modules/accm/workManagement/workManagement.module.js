"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkManagementModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const workManagement_controller_1 = require("./workManagement.controller");
const workManagement_entity_1 = require("./workManagement.entity");
const workManagement_service_1 = require("./workManagement.service");
let WorkManagementModule = class WorkManagementModule {
};
exports.WorkManagementModule = WorkManagementModule;
exports.WorkManagementModule = WorkManagementModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([workManagement_entity_1.AccmWorkManagementEntity]),
        ],
        controllers: [workManagement_controller_1.WorkManagementController],
        providers: [workManagement_service_1.WorkManagementService],
        exports: [typeorm_1.TypeOrmModule, workManagement_service_1.WorkManagementService],
    })
], WorkManagementModule);
//# sourceMappingURL=workManagement.module.js.map