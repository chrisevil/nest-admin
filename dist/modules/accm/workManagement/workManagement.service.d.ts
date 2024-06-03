import { EntityManager, Repository } from 'typeorm';
import { BaseService } from '~/helper/crud/base.service';
import { accmWorkManagementQueryDto } from './workManagement.dto';
import { AccmWorkManagementEntity } from './workManagement.entity';
export declare class WorkManagementService extends BaseService<AccmWorkManagementEntity> {
    private readonly accmWorkManagementRepository;
    private entityManager;
    constructor(accmWorkManagementRepository: Repository<AccmWorkManagementEntity>, entityManager: EntityManager);
    week({ workStart, workEnd, ...data }: accmWorkManagementQueryDto): Promise<AccmWorkManagementEntity[]>;
}
