import { SFileInfoDetail, SFileList, UploadToken } from './manage.class';
import { DeleteDto, FileInfoDto, FileOpDto, GetFileListDto, MKDirDto, MarkFileDto, RenameDto } from './manage.dto';
import { NetDiskManageService } from './manage.service';
export declare const permissions: {
    readonly LIST: "netdisk:manage:list";
    readonly CREATE: "netdisk:manage:create";
    readonly INFO: "netdisk:manage:info";
    readonly UPDATE: "netdisk:manage:update";
    readonly DELETE: "netdisk:manage:delete";
    readonly MKDIR: "netdisk:manage:mkdir";
    readonly TOKEN: "netdisk:manage:token";
    readonly MARK: "netdisk:manage:mark";
    readonly DOWNLOAD: "netdisk:manage:download";
    readonly RENAME: "netdisk:manage:rename";
    readonly CUT: "netdisk:manage:cut";
    readonly COPY: "netdisk:manage:copy";
};
export declare class NetDiskManageController {
    private manageService;
    constructor(manageService: NetDiskManageService);
    list(dto: GetFileListDto): Promise<SFileList>;
    mkdir(dto: MKDirDto): Promise<void>;
    token(user: IAuthUser): Promise<UploadToken>;
    info(dto: FileInfoDto): Promise<SFileInfoDetail>;
    mark(dto: MarkFileDto): Promise<void>;
    download(dto: FileInfoDto): Promise<string>;
    rename(dto: RenameDto): Promise<void>;
    delete(dto: DeleteDto): Promise<void>;
    cut(dto: FileOpDto): Promise<void>;
    copy(dto: FileOpDto): Promise<void>;
}
