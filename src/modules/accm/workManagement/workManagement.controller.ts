import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { ApiResult } from '~/common/decorators/api-result.decorator'
import { IdParam } from '~/common/decorators/id-param.decorator'
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'
import { BaseCrudFactory } from '~/helper/crud/crud.factory'
import { AllowAnon } from '~/modules/auth/decorators/allow-anon.decorator'

import { accmWorkManagementDto, accmWorkManagementQueryDto } from './workManagement.dto'
import { AccmWorkManagementEntity } from './workManagement.entity'
import { WorkManagementService } from './workManagement.service'

const BaseWorkManagementController = BaseCrudFactory({
  entity: AccmWorkManagementEntity,
  dto: accmWorkManagementDto,
  permissions: {
    LIST: 'workManagement:list',
    CREATE: 'workManagement:create',
    READ: 'workManagement:read',
    UPDATE: 'workManagement:update',
    DELETE: 'workManagement:delete',
  },
})

@ApiSecurityAuth()
@ApiTags('workManagement - 财务工作管理模块')
@Controller('accm/workManagement')
export class WorkManagementController extends BaseWorkManagementController {
  constructor(private readonly workManagementService: WorkManagementService) {
    super(workManagementService)
  }

  @Get(':userId/calendar')
  @ApiOperation({ summary: '获取个人工作安排日历' })
  @ApiResult({ type: [AccmWorkManagementEntity] })
  @AllowAnon()
  async calendar(@IdParam() userId: number): Promise<any> {
    return {
      console: `this.workManagementService.calendar(${userId})`,
    }
  }

  @Get(':userId/week')
  @ApiOperation({ summary: '根据时间段获取个人工作安排' })
  @ApiResult({ type: [AccmWorkManagementEntity] })
  @AllowAnon()
  async week(@IdParam() dto: accmWorkManagementQueryDto): Promise<AccmWorkManagementEntity[]> {
    return this.workManagementService.week(dto)
  }

  @Get(':userId/important')
  @ApiOperation({ summary: '获取个人重要工作' })
  @ApiResult({ type: [AccmWorkManagementEntity] })
  @AllowAnon()
  async important(@IdParam() userId: number): Promise<any> {
    return {
      console: `this.workManagementService.important(${userId})`,
    }
  }
}
