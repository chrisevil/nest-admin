"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.saveFile = exports.saveLocalFile = exports.getFilePath = exports.fileRename = exports.getSize = exports.getExtname = exports.getName = exports.getFileType = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const dayjs_1 = __importDefault(require("dayjs"));
var Type;
(function (Type) {
    Type["IMAGE"] = "\u56FE\u7247";
    Type["TXT"] = "\u6587\u6863";
    Type["MUSIC"] = "\u97F3\u4E50";
    Type["VIDEO"] = "\u89C6\u9891";
    Type["OTHER"] = "\u5176\u4ED6";
})(Type || (Type = {}));
function getFileType(extName) {
    const documents = 'txt doc pdf ppt pps xlsx xls docx';
    const music = 'mp3 wav wma mpa ram ra aac aif m4a';
    const video = 'avi mpg mpe mpeg asf wmv mov qt rm mp4 flv m4v webm ogv ogg';
    const image = 'bmp dib pcp dif wmf gif jpg tif eps psd cdr iff tga pcd mpt png jpeg';
    if (image.includes(extName))
        return Type.IMAGE;
    if (documents.includes(extName))
        return Type.TXT;
    if (music.includes(extName))
        return Type.MUSIC;
    if (video.includes(extName))
        return Type.VIDEO;
    return Type.OTHER;
}
exports.getFileType = getFileType;
function getName(fileName) {
    if (fileName.includes('.'))
        return fileName.split('.')[0];
    return fileName;
}
exports.getName = getName;
function getExtname(fileName) {
    return node_path_1.default.extname(fileName).replace('.', '');
}
exports.getExtname = getExtname;
function getSize(bytes, decimals = 2) {
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${Number.parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}
exports.getSize = getSize;
function fileRename(fileName) {
    const name = fileName.split('.')[0];
    const extName = node_path_1.default.extname(fileName);
    const time = (0, dayjs_1.default)().format('YYYYMMDDHHmmSSS');
    return `${name}-${time}${extName}`;
}
exports.fileRename = fileRename;
function getFilePath(name, currentDate, type) {
    return `/upload/${currentDate}/${type}/${name}`;
}
exports.getFilePath = getFilePath;
async function saveLocalFile(buffer, name, currentDate, type) {
    const filePath = node_path_1.default.join(__dirname, '../../', 'public/upload/', `${currentDate}/`, `${type}/`);
    try {
        await node_fs_1.default.promises.stat(filePath);
    }
    catch (error) {
        await node_fs_1.default.promises.mkdir(filePath, { recursive: true });
    }
    const writeStream = node_fs_1.default.createWriteStream(filePath + name);
    writeStream.write(buffer);
}
exports.saveLocalFile = saveLocalFile;
async function saveFile(file, name) {
    const filePath = node_path_1.default.join(__dirname, '../../', 'public/upload', name);
    const writeStream = node_fs_1.default.createWriteStream(filePath);
    const buffer = await file.toBuffer();
    writeStream.write(buffer);
}
exports.saveFile = saveFile;
async function deleteFile(name) {
    node_fs_1.default.unlink(node_path_1.default.join(__dirname, '../../', 'public', name), () => {
    });
}
exports.deleteFile = deleteFile;
//# sourceMappingURL=file.util.js.map