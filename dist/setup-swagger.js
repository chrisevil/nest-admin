"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const swagger_decorator_1 = require("./common/decorators/swagger.decorator");
const common_entity_1 = require("./common/entity/common.entity");
const response_model_1 = require("./common/model/response.model");
const pagination_1 = require("./helper/paginate/pagination");
function setupSwagger(app, configService) {
    const { name, port } = configService.get('app');
    const { enable, path } = configService.get('swagger');
    if (!enable)
        return;
    const documentBuilder = new swagger_1.DocumentBuilder()
        .setTitle(name)
        .setDescription(`${name} API document`)
        .setVersion('1.0');
    documentBuilder.addSecurity(swagger_decorator_1.API_SECURITY_AUTH, {
        description: '输入令牌（Enter the token）',
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
    });
    const document = swagger_1.SwaggerModule.createDocument(app, documentBuilder.build(), {
        ignoreGlobalPrefix: false,
        extraModels: [common_entity_1.CommonEntity, response_model_1.ResOp, pagination_1.Pagination, response_model_1.TreeResult],
    });
    swagger_1.SwaggerModule.setup(path, app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
    const logger = new common_1.Logger('SwaggerModule');
    logger.log(`Document running on http://127.0.0.1:${port}/${path}`);
}
exports.setupSwagger = setupSwagger;
//# sourceMappingURL=setup-swagger.js.map