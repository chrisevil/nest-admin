import { accmWorkManagementQueryDto } from './workManagement.dto';
import { AccmWorkManagementEntity } from './workManagement.entity';
import { WorkManagementService } from './workManagement.service';
declare const BaseWorkManagementController: import("@nestjs/common").Type<any>;
export declare class WorkManagementController extends BaseWorkManagementController {
    private readonly workManagementService;
    constructor(workManagementService: WorkManagementService);
    calendar(userId: number): Promise<any>;
    week(dto: accmWorkManagementQueryDto): Promise<AccmWorkManagementEntity[]>;
    important(userId: number): Promise<any>;
}
export {};
