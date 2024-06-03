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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const dayjs_1 = __importDefault(require("dayjs"));
const lodash_1 = require("lodash");
const typeorm_2 = require("typeorm");
const storage_entity_1 = require("../storage/storage.entity");
const file_util_1 = require("../../../utils/file.util");
let UploadService = class UploadService {
    storageRepository;
    constructor(storageRepository) {
        this.storageRepository = storageRepository;
    }
    async saveFile(file, userId) {
        if ((0, lodash_1.isNil)(file))
            throw new common_1.NotFoundException('Have not any file to upload!');
        const fileName = file.filename;
        const size = (0, file_util_1.getSize)(file.file.bytesRead);
        const extName = (0, file_util_1.getExtname)(fileName);
        const type = (0, file_util_1.getFileType)(extName);
        const name = (0, file_util_1.fileRename)(fileName);
        const currentDate = (0, dayjs_1.default)().format('YYYY-MM-DD');
        const path = (0, file_util_1.getFilePath)(name, currentDate, type);
        (0, file_util_1.saveLocalFile)(await file.toBuffer(), name, currentDate, type);
        await this.storageRepository.save({
            name,
            fileName,
            extName,
            path,
            type,
            size,
            userId,
        });
        return path;
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(storage_entity_1.Storage)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UploadService);
//# sourceMappingURL=upload.service.js.map