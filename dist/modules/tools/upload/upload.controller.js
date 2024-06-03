"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = exports.permissions = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const swagger_decorator_1 = require("../../../common/decorators/swagger.decorator");
const auth_user_decorator_1 = require("../../auth/decorators/auth-user.decorator");
const permission_decorator_1 = require("../../auth/decorators/permission.decorator");
const upload_dto_1 = require("./upload.dto");
const upload_service_1 = require("./upload.service");
exports.permissions = (0, permission_decorator_1.definePermission)('upload', {
    UPLOAD: 'upload',
});
let UploadController = class UploadController {
    uploadService;
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    async upload(req, user) {
        if (!req.isMultipart())
            throw new common_1.BadRequestException('Request is not multipart');
        const file = await req.file();
        try {
            const path = await this.uploadService.saveFile(file, user.uid);
            return {
                filename: path,
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException('上传失败');
        }
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Post)(),
    (0, permission_decorator_1.Perm)(exports.permissions.UPLOAD),
    (0, swagger_1.ApiOperation)({ summary: '上传' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        type: upload_dto_1.FileUploadDto,
    }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "upload", null);
exports.UploadController = UploadController = __decorate([
    (0, swagger_decorator_1.ApiSecurityAuth)(),
    (0, swagger_1.ApiTags)('Tools - 上传模块'),
    (0, common_1.Controller)('upload'),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], UploadController);
//# sourceMappingURL=upload.controller.js.map