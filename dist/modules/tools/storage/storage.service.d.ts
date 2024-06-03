import { Repository } from 'typeorm';
import { Pagination } from '~/helper/paginate/pagination';
import { Storage } from '~/modules/tools/storage/storage.entity';
import { UserEntity } from '~/modules/user/user.entity';
import { StorageCreateDto, StoragePageDto } from './storage.dto';
import { StorageInfo } from './storage.modal';
export declare class StorageService {
    private storageRepository;
    private userRepository;
    constructor(storageRepository: Repository<Storage>, userRepository: Repository<UserEntity>);
    create(dto: StorageCreateDto, userId: number): Promise<void>;
    delete(fileIds: number[]): Promise<void>;
    list({ page, pageSize, name, type, size, extName, time, username, }: StoragePageDto): Promise<Pagination<StorageInfo>>;
    count(): Promise<number>;
}
