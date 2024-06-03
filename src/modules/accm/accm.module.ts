import { Module } from '@nestjs/common'

import { WorkManagementModule } from './workManagement/workManagement.module'

const modules = [
  // DeptModule,
  // UserModule,
  WorkManagementModule, // 认证模块
]
@Module({
  imports: [
    ...modules,
  ],
  exports: [...modules],
})
export class ACCMModule {}
