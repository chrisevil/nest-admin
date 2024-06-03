import { MultipartFile } from '@fastify/multipart';
import { Repository } from 'typeorm';
import { Storage } from '~/modules/tools/storage/storage.entity';
export declare class UploadService {
    private storageRepository;
    constructor(storageRepository: Repository<Storage>);
    saveFile(file: MultipartFile, userId: number): Promise<string>;
}
