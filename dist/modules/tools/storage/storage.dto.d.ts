import { PagerDto } from '~/common/dto/pager.dto';
export declare class StoragePageDto extends PagerDto {
    name: string;
    extName: string;
    type: string;
    size: string;
    time: string[];
    username: string;
}
export declare class StorageCreateDto {
    name: string;
    fileName: string;
    extName: string;
    path: string;
    type: string;
    size: string;
}
export declare class StorageDeleteDto {
    ids: number[];
}
