import { ServeStatInfo } from './serve.model';
import { ServeService } from './serve.service';
export declare class ServeController {
    private serveService;
    constructor(serveService: ServeService);
    stat(): Promise<ServeStatInfo>;
}
