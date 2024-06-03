import { Injectable } from '@nestjs/common'
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'

import { EntityManager, Repository } from 'typeorm'

import { BaseService } from '~/helper/crud/base.service'

import { accmWorkManagementQueryDto } from './workManagement.dto'
import { AccmWorkManagementEntity } from './workManagement.entity'

@Injectable()
export class WorkManagementService extends BaseService<AccmWorkManagementEntity> {
  constructor(
    @InjectRepository(AccmWorkManagementEntity)
    private readonly accmWorkManagementRepository: Repository<AccmWorkManagementEntity>,
    @InjectEntityManager() private entityManager: EntityManager,
  ) {
    super(accmWorkManagementRepository)
  }

  async week({ workStart, workEnd, ...data }: accmWorkManagementQueryDto) {
    const query = this.accmWorkManagementRepository.createQueryBuilder()
    if (workStart)
      query.andWhere('workStart >= :workStart', { workStart: `${workStart}` })
    if (workEnd)
      query.andWhere('workEnd <= :workEnd', { workEnd: `${workEnd}` })

    query.orderBy({
      userId: 'DESC',
      workStart: 'DESC',
      workImportant: 'ASC',
    })
    return query.getMany()
  }
}
