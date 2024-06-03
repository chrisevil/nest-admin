/// <reference types="node" />
import { MultipartFile } from '@fastify/multipart';
declare enum Type {
    IMAGE = "\u56FE\u7247",
    TXT = "\u6587\u6863",
    MUSIC = "\u97F3\u4E50",
    VIDEO = "\u89C6\u9891",
    OTHER = "\u5176\u4ED6"
}
export declare function getFileType(extName: string): Type;
export declare function getName(fileName: string): string;
export declare function getExtname(fileName: string): string;
export declare function getSize(bytes: number, decimals?: number): string;
export declare function fileRename(fileName: string): string;
export declare function getFilePath(name: string, currentDate: string, type: string): string;
export declare function saveLocalFile(buffer: Buffer, name: string, currentDate: string, type: string): Promise<void>;
export declare function saveFile(file: MultipartFile, name: string): Promise<void>;
export declare function deleteFile(name: string): Promise<void>;
export {};
