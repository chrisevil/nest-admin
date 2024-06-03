"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetDiskManageService = void 0;
const node_path_1 = require("node:path");
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const qiniu = __importStar(require("qiniu"));
const config_1 = require("../../../config");
const oss_constant_1 = require("../../../constants/oss.constant");
const user_service_1 = require("../../user/user.service");
const utils_1 = require("../../../utils");
let NetDiskManageService = class NetDiskManageService {
    qiniuConfig;
    userService;
    config;
    mac;
    bucketManager;
    constructor(qiniuConfig, userService) {
        this.qiniuConfig = qiniuConfig;
        this.userService = userService;
        this.mac = new qiniu.auth.digest.Mac(this.qiniuConfig.accessKey, this.qiniuConfig.secretKey);
        this.config = new qiniu.conf.Config({
            zone: this.qiniuConfig.zone,
        });
        this.bucketManager = new qiniu.rs.BucketManager(this.mac, this.config);
    }
    async getFileList(prefix = '', marker = '', skey = '') {
        const searching = !(0, lodash_1.isEmpty)(skey);
        return new Promise((resolve, reject) => {
            this.bucketManager.listPrefix(this.qiniuConfig.bucket, {
                prefix: searching ? '' : prefix,
                limit: oss_constant_1.NETDISK_LIMIT,
                delimiter: searching ? '' : oss_constant_1.NETDISK_DELIMITER,
                marker,
            }, (err, respBody, respInfo) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (respInfo.statusCode === 200) {
                    const fileList = [];
                    if (!searching && !(0, lodash_1.isEmpty)(respBody.commonPrefixes)) {
                        for (const dirPath of respBody.commonPrefixes) {
                            const name = dirPath
                                .substr(0, dirPath.length - 1)
                                .replace(prefix, '');
                            if ((0, lodash_1.isEmpty)(skey) || name.includes(skey)) {
                                fileList.push({
                                    name: dirPath
                                        .substr(0, dirPath.length - 1)
                                        .replace(prefix, ''),
                                    type: 'dir',
                                    id: (0, utils_1.generateRandomValue)(10),
                                });
                            }
                        }
                    }
                    if (!(0, lodash_1.isEmpty)(respBody.items)) {
                        for (const item of respBody.items) {
                            if (searching) {
                                const pathList = item.key.split(oss_constant_1.NETDISK_DELIMITER);
                                const name = pathList.pop();
                                if (item.key.endsWith(oss_constant_1.NETDISK_DELIMITER)
                                    && pathList[pathList.length - 1].includes(skey)) {
                                    const ditName = pathList.pop();
                                    fileList.push({
                                        id: (0, utils_1.generateRandomValue)(10),
                                        name: ditName,
                                        type: 'dir',
                                        belongTo: pathList.join(oss_constant_1.NETDISK_DELIMITER),
                                    });
                                }
                                else if (name.includes(skey)) {
                                    fileList.push({
                                        id: (0, utils_1.generateRandomValue)(10),
                                        name,
                                        type: 'file',
                                        fsize: item.fsize,
                                        mimeType: item.mimeType,
                                        putTime: new Date(Number.parseInt(item.putTime) / 10000),
                                        belongTo: pathList.join(oss_constant_1.NETDISK_DELIMITER),
                                    });
                                }
                            }
                            else {
                                const fileKey = item.key.replace(prefix, '');
                                if (!(0, lodash_1.isEmpty)(fileKey)) {
                                    fileList.push({
                                        id: (0, utils_1.generateRandomValue)(10),
                                        name: fileKey,
                                        type: 'file',
                                        fsize: item.fsize,
                                        mimeType: item.mimeType,
                                        putTime: new Date(Number.parseInt(item.putTime) / 10000),
                                    });
                                }
                            }
                        }
                    }
                    resolve({
                        list: fileList,
                        marker: respBody.marker || null,
                    });
                }
                else {
                    reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                }
            });
        });
    }
    async getFileInfo(name, path) {
        return new Promise((resolve, reject) => {
            this.bucketManager.stat(this.qiniuConfig.bucket, `${path}${name}`, (err, respBody, respInfo) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (respInfo.statusCode === 200) {
                    const detailInfo = {
                        fsize: respBody.fsize,
                        hash: respBody.hash,
                        md5: respBody.md5,
                        mimeType: respBody.mimeType.split('/x-qn-meta')[0],
                        putTime: new Date(Number.parseInt(respBody.putTime) / 10000),
                        type: respBody.type,
                        uploader: '',
                        mark: respBody?.['x-qn-meta']?.['!mark'] ?? '',
                    };
                    if (!respBody.endUser) {
                        resolve(detailInfo);
                    }
                    else {
                        this.userService
                            .getAccountInfo(Number.parseInt(respBody.endUser))
                            .then((user) => {
                            if ((0, lodash_1.isEmpty)(user)) {
                                resolve(detailInfo);
                            }
                            else {
                                detailInfo.uploader = user.username;
                                resolve(detailInfo);
                            }
                        });
                    }
                }
                else {
                    reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                }
            });
        });
    }
    async changeFileHeaders(name, path, headers) {
        return new Promise((resolve, reject) => {
            this.bucketManager.changeHeaders(this.qiniuConfig.bucket, `${path}${name}`, headers, (err, _, respInfo) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (respInfo.statusCode === 200) {
                    resolve();
                }
                else {
                    reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                }
            });
        });
    }
    async createDir(dirName) {
        const safeDirName = dirName.endsWith('/') ? dirName : `${dirName}/`;
        return new Promise((resolve, reject) => {
            const formUploader = new qiniu.form_up.FormUploader(this.config);
            const putExtra = new qiniu.form_up.PutExtra();
            formUploader.put(this.createUploadToken(''), safeDirName, ' ', putExtra, (respErr, respBody, respInfo) => {
                if (respErr) {
                    reject(respErr);
                    return;
                }
                if (respInfo.statusCode === 200) {
                    resolve();
                }
                else {
                    reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                }
            });
        });
    }
    async checkFileExist(filePath) {
        return new Promise((resolve, reject) => {
            this.bucketManager.stat(this.qiniuConfig.bucket, filePath, (respErr, respBody, respInfo) => {
                if (respErr) {
                    reject(respErr);
                    return;
                }
                if (respInfo.statusCode === 200) {
                    resolve(true);
                }
                else if (respInfo.statusCode === 612) {
                    resolve(false);
                }
                else {
                    reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                }
            });
        });
    }
    createUploadToken(endUser) {
        const policy = new qiniu.rs.PutPolicy({
            scope: this.qiniuConfig.bucket,
            insertOnly: 1,
            fsizeLimit: 1024 ** 2 * 10,
            endUser,
        });
        const uploadToken = policy.uploadToken(this.mac);
        return uploadToken;
    }
    async renameFile(dir, name, toName) {
        const fileName = `${dir}${name}`;
        const toFileName = `${dir}${toName}`;
        const op = {
            force: true,
        };
        return new Promise((resolve, reject) => {
            this.bucketManager.move(this.qiniuConfig.bucket, fileName, this.qiniuConfig.bucket, toFileName, op, (err, respBody, respInfo) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (respInfo.statusCode === 200) {
                        resolve();
                    }
                    else {
                        reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                    }
                }
            });
        });
    }
    async moveFile(dir, toDir, name) {
        const fileName = `${dir}${name}`;
        const toFileName = `${toDir}${name}`;
        const op = {
            force: true,
        };
        return new Promise((resolve, reject) => {
            this.bucketManager.move(this.qiniuConfig.bucket, fileName, this.qiniuConfig.bucket, toFileName, op, (err, respBody, respInfo) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (respInfo.statusCode === 200) {
                        resolve();
                    }
                    else {
                        reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                    }
                }
            });
        });
    }
    async copyFile(dir, toDir, name) {
        const fileName = `${dir}${name}`;
        const ext = (0, node_path_1.extname)(name);
        const bn = (0, node_path_1.basename)(name, ext);
        const toFileName = `${toDir}${bn}${oss_constant_1.NETDISK_COPY_SUFFIX}${ext}`;
        const op = {
            force: true,
        };
        return new Promise((resolve, reject) => {
            this.bucketManager.copy(this.qiniuConfig.bucket, fileName, this.qiniuConfig.bucket, toFileName, op, (err, respBody, respInfo) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (respInfo.statusCode === 200) {
                        resolve();
                    }
                    else {
                        reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                    }
                }
            });
        });
    }
    async renameDir(path, name, toName) {
        const dirName = `${path}${name}`;
        const toDirName = `${path}${toName}`;
        let hasFile = true;
        let marker = '';
        const op = {
            force: true,
        };
        const bucketName = this.qiniuConfig.bucket;
        while (hasFile) {
            await new Promise((resolve, reject) => {
                this.bucketManager.listPrefix(this.qiniuConfig.bucket, {
                    prefix: dirName,
                    limit: oss_constant_1.NETDISK_HANDLE_MAX_ITEM,
                    marker,
                }, (err, respBody, respInfo) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (respInfo.statusCode === 200) {
                        const moveOperations = respBody.items.map((item) => {
                            const { key } = item;
                            const destKey = key.replace(dirName, toDirName);
                            return qiniu.rs.moveOp(bucketName, key, bucketName, destKey, op);
                        });
                        this.bucketManager.batch(moveOperations, (err2, respBody2, respInfo2) => {
                            if (err2) {
                                reject(err2);
                                return;
                            }
                            if (respInfo2.statusCode === 200) {
                                if ((0, lodash_1.isEmpty)(respBody.marker))
                                    hasFile = false;
                                else
                                    marker = respBody.marker;
                                resolve();
                            }
                            else {
                                reject(new Error(`Qiniu Error Code: ${respInfo2.statusCode}, Info: ${respInfo2.statusMessage}`));
                            }
                        });
                    }
                    else {
                        reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                    }
                });
            });
        }
    }
    getDownloadLink(key) {
        if (this.qiniuConfig.access === 'public') {
            return this.bucketManager.publicDownloadUrl(this.qiniuConfig.domain, key);
        }
        else if (this.qiniuConfig.access === 'private') {
            return this.bucketManager.privateDownloadUrl(this.qiniuConfig.domain, key, Date.now() / 1000 + 36000);
        }
        throw new Error('qiniu config access type not support');
    }
    async deleteFile(dir, name) {
        return new Promise((resolve, reject) => {
            this.bucketManager.delete(this.qiniuConfig.bucket, `${dir}${name}`, (err, respBody, respInfo) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (respInfo.statusCode === 200) {
                    resolve();
                }
                else {
                    reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                }
            });
        });
    }
    async deleteMultiFileOrDir(fileList, dir) {
        const files = fileList.filter(item => item.type === 'file');
        if (files.length > 0) {
            const copyOperations = files.map((item) => {
                const fileName = `${dir}${item.name}`;
                return qiniu.rs.deleteOp(this.qiniuConfig.bucket, fileName);
            });
            await new Promise((resolve, reject) => {
                this.bucketManager.batch(copyOperations, (err, respBody, respInfo) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (respInfo.statusCode === 200) {
                        resolve();
                    }
                    else if (respInfo.statusCode === 298) {
                        reject(new Error('操作异常，但部分文件夹删除成功'));
                    }
                    else {
                        reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                    }
                });
            });
        }
        const dirs = fileList.filter(item => item.type === 'dir');
        if (dirs.length > 0) {
            for (let i = 0; i < dirs.length; i++) {
                const dirName = `${dir}${dirs[i].name}/`;
                let hasFile = true;
                let marker = '';
                while (hasFile) {
                    await new Promise((resolve, reject) => {
                        this.bucketManager.listPrefix(this.qiniuConfig.bucket, {
                            prefix: dirName,
                            limit: oss_constant_1.NETDISK_HANDLE_MAX_ITEM,
                            marker,
                        }, (err, respBody, respInfo) => {
                            if (err) {
                                reject(err);
                                return;
                            }
                            if (respInfo.statusCode === 200) {
                                const moveOperations = respBody.items.map((item) => {
                                    const { key } = item;
                                    return qiniu.rs.deleteOp(this.qiniuConfig.bucket, key);
                                });
                                this.bucketManager.batch(moveOperations, (err2, respBody2, respInfo2) => {
                                    if (err2) {
                                        reject(err2);
                                        return;
                                    }
                                    if (respInfo2.statusCode === 200) {
                                        if ((0, lodash_1.isEmpty)(respBody.marker))
                                            hasFile = false;
                                        else
                                            marker = respBody.marker;
                                        resolve();
                                    }
                                    else {
                                        reject(new Error(`Qiniu Error Code: ${respInfo2.statusCode}, Info: ${respInfo2.statusMessage}`));
                                    }
                                });
                            }
                            else {
                                reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                            }
                        });
                    });
                }
            }
        }
    }
    async copyMultiFileOrDir(fileList, dir, toDir) {
        const files = fileList.filter(item => item.type === 'file');
        const op = {
            force: true,
        };
        if (files.length > 0) {
            const copyOperations = files.map((item) => {
                const fileName = `${dir}${item.name}`;
                const ext = (0, node_path_1.extname)(item.name);
                const bn = (0, node_path_1.basename)(item.name, ext);
                const toFileName = `${toDir}${bn}${oss_constant_1.NETDISK_COPY_SUFFIX}${ext}`;
                return qiniu.rs.copyOp(this.qiniuConfig.bucket, fileName, this.qiniuConfig.bucket, toFileName, op);
            });
            await new Promise((resolve, reject) => {
                this.bucketManager.batch(copyOperations, (err, respBody, respInfo) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (respInfo.statusCode === 200) {
                        resolve();
                    }
                    else if (respInfo.statusCode === 298) {
                        reject(new Error('操作异常，但部分文件夹删除成功'));
                    }
                    else {
                        reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                    }
                });
            });
        }
        const dirs = fileList.filter(item => item.type === 'dir');
        if (dirs.length > 0) {
            for (let i = 0; i < dirs.length; i++) {
                const dirName = `${dir}${dirs[i].name}/`;
                const copyDirName = `${toDir}${dirs[i].name}${oss_constant_1.NETDISK_COPY_SUFFIX}/`;
                let hasFile = true;
                let marker = '';
                while (hasFile) {
                    await new Promise((resolve, reject) => {
                        this.bucketManager.listPrefix(this.qiniuConfig.bucket, {
                            prefix: dirName,
                            limit: oss_constant_1.NETDISK_HANDLE_MAX_ITEM,
                            marker,
                        }, (err, respBody, respInfo) => {
                            if (err) {
                                reject(err);
                                return;
                            }
                            if (respInfo.statusCode === 200) {
                                const moveOperations = respBody.items.map((item) => {
                                    const { key } = item;
                                    const destKey = key.replace(dirName, copyDirName);
                                    return qiniu.rs.copyOp(this.qiniuConfig.bucket, key, this.qiniuConfig.bucket, destKey, op);
                                });
                                this.bucketManager.batch(moveOperations, (err2, respBody2, respInfo2) => {
                                    if (err2) {
                                        reject(err2);
                                        return;
                                    }
                                    if (respInfo2.statusCode === 200) {
                                        if ((0, lodash_1.isEmpty)(respBody.marker))
                                            hasFile = false;
                                        else
                                            marker = respBody.marker;
                                        resolve();
                                    }
                                    else {
                                        reject(new Error(`Qiniu Error Code: ${respInfo2.statusCode}, Info: ${respInfo2.statusMessage}`));
                                    }
                                });
                            }
                            else {
                                reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                            }
                        });
                    });
                }
            }
        }
    }
    async moveMultiFileOrDir(fileList, dir, toDir) {
        const files = fileList.filter(item => item.type === 'file');
        const op = {
            force: true,
        };
        if (files.length > 0) {
            const copyOperations = files.map((item) => {
                const fileName = `${dir}${item.name}`;
                const toFileName = `${toDir}${item.name}`;
                return qiniu.rs.moveOp(this.qiniuConfig.bucket, fileName, this.qiniuConfig.bucket, toFileName, op);
            });
            await new Promise((resolve, reject) => {
                this.bucketManager.batch(copyOperations, (err, respBody, respInfo) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (respInfo.statusCode === 200) {
                        resolve();
                    }
                    else if (respInfo.statusCode === 298) {
                        reject(new Error('操作异常，但部分文件夹删除成功'));
                    }
                    else {
                        reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                    }
                });
            });
        }
        const dirs = fileList.filter(item => item.type === 'dir');
        if (dirs.length > 0) {
            for (let i = 0; i < dirs.length; i++) {
                const dirName = `${dir}${dirs[i].name}/`;
                const toDirName = `${toDir}${dirs[i].name}/`;
                if (toDirName.startsWith(dirName))
                    continue;
                let hasFile = true;
                let marker = '';
                while (hasFile) {
                    await new Promise((resolve, reject) => {
                        this.bucketManager.listPrefix(this.qiniuConfig.bucket, {
                            prefix: dirName,
                            limit: oss_constant_1.NETDISK_HANDLE_MAX_ITEM,
                            marker,
                        }, (err, respBody, respInfo) => {
                            if (err) {
                                reject(err);
                                return;
                            }
                            if (respInfo.statusCode === 200) {
                                const moveOperations = respBody.items.map((item) => {
                                    const { key } = item;
                                    const destKey = key.replace(dirName, toDirName);
                                    return qiniu.rs.moveOp(this.qiniuConfig.bucket, key, this.qiniuConfig.bucket, destKey, op);
                                });
                                this.bucketManager.batch(moveOperations, (err2, respBody2, respInfo2) => {
                                    if (err2) {
                                        reject(err2);
                                        return;
                                    }
                                    if (respInfo2.statusCode === 200) {
                                        if ((0, lodash_1.isEmpty)(respBody.marker))
                                            hasFile = false;
                                        else
                                            marker = respBody.marker;
                                        resolve();
                                    }
                                    else {
                                        reject(new Error(`Qiniu Error Code: ${respInfo2.statusCode}, Info: ${respInfo2.statusMessage}`));
                                    }
                                });
                            }
                            else {
                                reject(new Error(`Qiniu Error Code: ${respInfo.statusCode}, Info: ${respInfo.statusMessage}`));
                            }
                        });
                    });
                }
            }
        }
    }
};
exports.NetDiskManageService = NetDiskManageService;
exports.NetDiskManageService = NetDiskManageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(config_1.OssConfig.KEY)),
    __metadata("design:paramtypes", [Object, user_service_1.UserService])
], NetDiskManageService);
//# sourceMappingURL=manage.service.js.map