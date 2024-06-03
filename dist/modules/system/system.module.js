"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const user_module_1 = require("../user/user.module");
const dept_module_1 = require("./dept/dept.module");
const dict_item_module_1 = require("./dict-item/dict-item.module");
const dict_type_module_1 = require("./dict-type/dict-type.module");
const log_module_1 = require("./log/log.module");
const menu_module_1 = require("./menu/menu.module");
const online_module_1 = require("./online/online.module");
const param_config_module_1 = require("./param-config/param-config.module");
const role_module_1 = require("./role/role.module");
const serve_module_1 = require("./serve/serve.module");
const task_module_1 = require("./task/task.module");
const modules = [
    user_module_1.UserModule,
    role_module_1.RoleModule,
    menu_module_1.MenuModule,
    dept_module_1.DeptModule,
    dict_type_module_1.DictTypeModule,
    dict_item_module_1.DictItemModule,
    param_config_module_1.ParamConfigModule,
    log_module_1.LogModule,
    task_module_1.TaskModule,
    online_module_1.OnlineModule,
    serve_module_1.ServeModule,
];
let SystemModule = class SystemModule {
};
exports.SystemModule = SystemModule;
exports.SystemModule = SystemModule = __decorate([
    (0, common_1.Module)({
        imports: [
            ...modules,
            core_1.RouterModule.register([
                {
                    path: 'system',
                    module: SystemModule,
                    children: [...modules],
                },
            ]),
        ],
        exports: [...modules],
    })
], SystemModule);
//# sourceMappingURL=system.module.js.map