"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const throttler_1 = require("@nestjs/throttler");
const config_2 = __importDefault(require("./config"));
const shared_module_1 = require("./shared/shared.module");
const any_exception_filter_1 = require("./common/filters/any-exception.filter");
const idempotence_interceptor_1 = require("./common/interceptors/idempotence.interceptor");
const timeout_interceptor_1 = require("./common/interceptors/timeout.interceptor");
const transform_interceptor_1 = require("./common/interceptors/transform.interceptor");
const accm_module_1 = require("./modules/accm/accm.module");
const auth_module_1 = require("./modules/auth/auth.module");
const jwt_auth_guard_1 = require("./modules/auth/guards/jwt-auth.guard");
const rbac_guard_1 = require("./modules/auth/guards/rbac.guard");
const health_module_1 = require("./modules/health/health.module");
const netdisk_module_1 = require("./modules/netdisk/netdisk.module");
const sse_module_1 = require("./modules/sse/sse.module");
const system_module_1 = require("./modules/system/system.module");
const tasks_module_1 = require("./modules/tasks/tasks.module");
const todo_module_1 = require("./modules/todo/todo.module");
const tools_module_1 = require("./modules/tools/tools.module");
const database_module_1 = require("./shared/database/database.module");
const socket_module_1 = require("./socket/socket.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                expandVariables: true,
                envFilePath: ['.env.local', `.env.${process.env.NODE_ENV}`, '.env'],
                load: [...Object.values(config_2.default)],
            }),
            throttler_1.ThrottlerModule.forRootAsync({
                useFactory: () => ({
                    errorMessage: '当前操作过于频繁，请稍后再试！',
                    throttlers: [
                        { ttl: (0, throttler_1.seconds)(10), limit: 7 },
                    ],
                }),
            }),
            shared_module_1.SharedModule,
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            system_module_1.SystemModule,
            tasks_module_1.TasksModule.forRoot(),
            tools_module_1.ToolsModule,
            socket_module_1.SocketModule,
            health_module_1.HealthModule,
            sse_module_1.SseModule,
            netdisk_module_1.NetdiskModule,
            accm_module_1.ACCMModule,
            todo_module_1.TodoModule,
        ],
        providers: [
            { provide: core_1.APP_FILTER, useClass: any_exception_filter_1.AllExceptionsFilter },
            { provide: core_1.APP_INTERCEPTOR, useClass: common_1.ClassSerializerInterceptor },
            { provide: core_1.APP_INTERCEPTOR, useClass: transform_interceptor_1.TransformInterceptor },
            { provide: core_1.APP_INTERCEPTOR, useFactory: () => new timeout_interceptor_1.TimeoutInterceptor(15 * 1000) },
            { provide: core_1.APP_INTERCEPTOR, useClass: idempotence_interceptor_1.IdempotenceInterceptor },
            { provide: core_1.APP_GUARD, useClass: jwt_auth_guard_1.JwtAuthGuard },
            { provide: core_1.APP_GUARD, useClass: rbac_guard_1.RbacGuard },
            { provide: core_1.APP_GUARD, useClass: throttler_1.ThrottlerGuard },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map