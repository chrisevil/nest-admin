import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { WorkManagementController } from './workManagement.controller'
import { AccmWorkManagementEntity } from './workManagement.entity'
import { WorkManagementService } from './workManagement.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([AccmWorkManagementEntity]),
  ],
  controllers: [WorkManagementController],
  providers: [WorkManagementService],
  exports: [TypeOrmModule, WorkManagementService],
})
export class WorkManagementModule {}
