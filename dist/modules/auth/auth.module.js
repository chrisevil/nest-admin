"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const env_1 = require("../../global/env");
const log_module_1 = require("../system/log/log.module");
const menu_module_1 = require("../system/menu/menu.module");
const role_module_1 = require("../system/role/role.module");
const user_module_1 = require("../user/user.module");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const account_controller_1 = require("./controllers/account.controller");
const captcha_controller_1 = require("./controllers/captcha.controller");
const email_controller_1 = require("./controllers/email.controller");
const access_token_entity_1 = require("./entities/access-token.entity");
const refresh_token_entity_1 = require("./entities/refresh-token.entity");
const captcha_service_1 = require("./services/captcha.service");
const token_service_1 = require("./services/token.service");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const local_strategy_1 = require("./strategies/local.strategy");
const controllers = [
    auth_controller_1.AuthController,
    account_controller_1.AccountController,
    captcha_controller_1.CaptchaController,
    email_controller_1.EmailController,
];
const providers = [auth_service_1.AuthService, token_service_1.TokenService, captcha_service_1.CaptchaService];
const strategies = [local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy];
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([access_token_entity_1.AccessTokenEntity, refresh_token_entity_1.RefreshTokenEntity]),
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => {
                    const { jwtSecret, jwtExprire } = configService.get('security');
                    return {
                        secret: jwtSecret,
                        signOptions: {
                            expiresIn: `${jwtExprire}s`,
                        },
                        ignoreExpiration: env_1.isDev,
                    };
                },
                inject: [config_1.ConfigService],
            }),
            user_module_1.UserModule,
            role_module_1.RoleModule,
            menu_module_1.MenuModule,
            log_module_1.LogModule,
        ],
        controllers: [...controllers],
        providers: [...providers, ...strategies],
        exports: [typeorm_1.TypeOrmModule, jwt_1.JwtModule, ...providers],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map