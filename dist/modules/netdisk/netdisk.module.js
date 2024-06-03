"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetdiskModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const user_module_1 = require("../user/user.module");
const manage_controller_1 = require("./manager/manage.controller");
const manage_service_1 = require("./manager/manage.service");
const overview_controller_1 = require("./overview/overview.controller");
const overview_service_1 = require("./overview/overview.service");
let NetdiskModule = class NetdiskModule {
};
exports.NetdiskModule = NetdiskModule;
exports.NetdiskModule = NetdiskModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule, core_1.RouterModule.register([
                {
                    path: 'netdisk',
                    module: NetdiskModule,
                },
            ])],
        controllers: [manage_controller_1.NetDiskManageController, overview_controller_1.NetDiskOverviewController],
        providers: [manage_service_1.NetDiskManageService, overview_service_1.NetDiskOverviewService],
    })
], NetdiskModule);
//# sourceMappingURL=netdisk.module.js.map