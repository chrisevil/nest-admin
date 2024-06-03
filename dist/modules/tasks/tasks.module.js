"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TasksModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksModule = void 0;
const common_1 = require("@nestjs/common");
const log_module_1 = require("../system/log/log.module");
const system_module_1 = require("../system/system.module");
const email_job_1 = require("./jobs/email.job");
const http_request_job_1 = require("./jobs/http-request.job");
const log_clear_job_1 = require("./jobs/log-clear.job");
const providers = [log_clear_job_1.LogClearJob, http_request_job_1.HttpRequestJob, email_job_1.EmailJob];
function createAliasProviders() {
    const aliasProviders = [];
    for (const p of providers) {
        aliasProviders.push({
            provide: p.name,
            useExisting: p,
        });
    }
    return aliasProviders;
}
let TasksModule = TasksModule_1 = class TasksModule {
    static forRoot() {
        const aliasProviders = createAliasProviders();
        return {
            global: true,
            module: TasksModule_1,
            imports: [system_module_1.SystemModule, log_module_1.LogModule],
            providers: [...providers, ...aliasProviders],
            exports: aliasProviders,
        };
    }
};
exports.TasksModule = TasksModule;
exports.TasksModule = TasksModule = TasksModule_1 = __decorate([
    (0, common_1.Module)({})
], TasksModule);
//# sourceMappingURL=tasks.module.js.map