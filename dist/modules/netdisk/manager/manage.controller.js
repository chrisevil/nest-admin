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
exports.NetDiskManageController = exports.permissions = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const biz_exception_1 = require("../../../common/exceptions/biz.exception");
const error_code_constant_1 = require("../../../constants/error-code.constant");
const auth_user_decorator_1 = require("../../auth/decorators/auth-user.decorator");
const permission_decorator_1 = require("../../auth/decorators/permission.decorator");
const utils_1 = require("../../../utils");
const manage_class_1 = require("./manage.class");
const manage_dto_1 = require("./manage.dto");
const manage_service_1 = require("./manage.service");
exports.permissions = (0, permission_decorator_1.definePermission)('netdisk:manage', {
    LIST: 'list',
    CREATE: 'create',
    INFO: 'info',
    UPDATE: 'update',
    DELETE: 'delete',
    MKDIR: 'mkdir',
    TOKEN: 'token',
    MARK: 'mark',
    DOWNLOAD: 'download',
    RENAME: 'rename',
    CUT: 'cut',
    COPY: 'copy',
});
let NetDiskManageController = class NetDiskManageController {
    manageService;
    constructor(manageService) {
        this.manageService = manageService;
    }
    async list(dto) {
        return await this.manageService.getFileList(dto.path, dto.marker, dto.key);
    }
    async mkdir(dto) {
        const result = await this.manageService.checkFileExist(`${dto.path}${dto.dirName}/`);
        if (result)
            throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.OSS_FILE_OR_DIR_EXIST);
        await this.manageService.createDir(`${dto.path}${dto.dirName}`);
    }
    async token(user) {
        (0, utils_1.checkIsDemoMode)();
        return {
            token: this.manageService.createUploadToken(`${user.uid}`),
        };
    }
    async info(dto) {
        return await this.manageService.getFileInfo(dto.name, dto.path);
    }
    async mark(dto) {
        await this.manageService.changeFileHeaders(dto.name, dto.path, {
            mark: dto.mark,
        });
    }
    async download(dto) {
        return this.manageService.getDownloadLink(`${dto.path}${dto.name}`);
    }
    async rename(dto) {
        const result = await this.manageService.checkFileExist(`${dto.path}${dto.toName}${dto.type === 'dir' ? '/' : ''}`);
        if (result)
            throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.OSS_FILE_OR_DIR_EXIST);
        if (dto.type === 'file')
            await this.manageService.renameFile(dto.path, dto.name, dto.toName);
        else
            await this.manageService.renameDir(dto.path, dto.name, dto.toName);
    }
    async delete(dto) {
        await this.manageService.deleteMultiFileOrDir(dto.files, dto.path);
    }
    async cut(dto) {
        if (dto.originPath === dto.toPath)
            throw new biz_exception_1.BusinessException(error_code_constant_1.ErrorEnum.OSS_NO_OPERATION_REQUIRED);
        await this.manageService.moveMultiFileOrDir(dto.files, dto.originPath, dto.toPath);
    }
    async copy(dto) {
        await this.manageService.copyMultiFileOrDir(dto.files, dto.originPath, dto.toPath);
    }
};
exports.NetDiskManageController = NetDiskManageController;
__decorate([
    (0, common_1.Get)('list'),
    (0, swagger_1.ApiOperation)({ summary: '获取文件列表' }),
    (0, swagger_1.ApiOkResponse)({ type: manage_class_1.SFileList }),
    (0, permission_decorator_1.Perm)(exports.permissions.LIST),
    openapi.ApiResponse({ status: 200, type: require("./manage.class").SFileList }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manage_dto_1.GetFileListDto]),
    __metadata("design:returntype", Promise)
], NetDiskManageController.prototype, "list", null);
__decorate([
    (0, common_1.Post)('mkdir'),
    (0, swagger_1.ApiOperation)({ summary: '创建文件夹，支持多级' }),
    (0, permission_decorator_1.Perm)(exports.permissions.MKDIR),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manage_dto_1.MKDirDto]),
    __metadata("design:returntype", Promise)
], NetDiskManageController.prototype, "mkdir", null);
__decorate([
    (0, common_1.Get)('token'),
    (0, swagger_1.ApiOperation)({ summary: '获取上传Token，无Token前端无法上传' }),
    (0, swagger_1.ApiOkResponse)({ type: manage_class_1.UploadToken }),
    (0, permission_decorator_1.Perm)(exports.permissions.TOKEN),
    openapi.ApiResponse({ status: 200, type: require("./manage.class").UploadToken }),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NetDiskManageController.prototype, "token", null);
__decorate([
    (0, common_1.Get)('info'),
    (0, swagger_1.ApiOperation)({ summary: '获取文件详细信息' }),
    (0, swagger_1.ApiOkResponse)({ type: manage_class_1.SFileInfoDetail }),
    (0, permission_decorator_1.Perm)(exports.permissions.INFO),
    openapi.ApiResponse({ status: 200, type: require("./manage.class").SFileInfoDetail }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manage_dto_1.FileInfoDto]),
    __metadata("design:returntype", Promise)
], NetDiskManageController.prototype, "info", null);
__decorate([
    (0, common_1.Post)('mark'),
    (0, swagger_1.ApiOperation)({ summary: '添加文件备注' }),
    (0, permission_decorator_1.Perm)(exports.permissions.MARK),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manage_dto_1.MarkFileDto]),
    __metadata("design:returntype", Promise)
], NetDiskManageController.prototype, "mark", null);
__decorate([
    (0, common_1.Get)('download'),
    (0, swagger_1.ApiOperation)({ summary: '获取下载链接，不支持下载文件夹' }),
    (0, swagger_1.ApiOkResponse)({ type: String }),
    (0, permission_decorator_1.Perm)(exports.permissions.DOWNLOAD),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manage_dto_1.FileInfoDto]),
    __metadata("design:returntype", Promise)
], NetDiskManageController.prototype, "download", null);
__decorate([
    (0, common_1.Post)('rename'),
    (0, swagger_1.ApiOperation)({ summary: '重命名文件或文件夹' }),
    (0, permission_decorator_1.Perm)(exports.permissions.RENAME),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manage_dto_1.RenameDto]),
    __metadata("design:returntype", Promise)
], NetDiskManageController.prototype, "rename", null);
__decorate([
    (0, common_1.Post)('delete'),
    (0, swagger_1.ApiOperation)({ summary: '删除文件或文件夹' }),
    (0, permission_decorator_1.Perm)(exports.permissions.DELETE),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manage_dto_1.DeleteDto]),
    __metadata("design:returntype", Promise)
], NetDiskManageController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('cut'),
    (0, swagger_1.ApiOperation)({ summary: '剪切文件或文件夹，支持批量' }),
    (0, permission_decorator_1.Perm)(exports.permissions.CUT),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manage_dto_1.FileOpDto]),
    __metadata("design:returntype", Promise)
], NetDiskManageController.prototype, "cut", null);
__decorate([
    (0, common_1.Post)('copy'),
    (0, swagger_1.ApiOperation)({ summary: '复制文件或文件夹，支持批量' }),
    (0, permission_decorator_1.Perm)(exports.permissions.COPY),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manage_dto_1.FileOpDto]),
    __metadata("design:returntype", Promise)
], NetDiskManageController.prototype, "copy", null);
exports.NetDiskManageController = NetDiskManageController = __decorate([
    (0, swagger_1.ApiTags)('NetDiskManage - 网盘管理模块'),
    (0, common_1.Controller)('manage'),
    __metadata("design:paramtypes", [manage_service_1.NetDiskManageService])
], NetDiskManageController);
//# sourceMappingURL=manage.controller.js.map