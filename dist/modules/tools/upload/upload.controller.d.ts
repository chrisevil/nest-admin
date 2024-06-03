import { FastifyRequest } from 'fastify';
import { UploadService } from './upload.service';
export declare const permissions: {
    readonly UPLOAD: "upload:upload";
};
export declare class UploadController {
    private uploadService;
    constructor(uploadService: UploadService);
    upload(req: FastifyRequest, user: IAuthUser): Promise<{
        filename: string;
    }>;
}
