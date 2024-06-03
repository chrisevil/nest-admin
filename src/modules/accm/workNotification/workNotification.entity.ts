import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm'

import { CommonEntity } from '~/common/entity/common.entity'
import { UserEntity } from '~/modules/user/user.entity'

import { AccmWorkManagementEntity } from '../workManagement/workManagement.entity'

@Entity('accm_work_notification')
export class AccmWorkNotificationEntity extends CommonEntity {
  @Column({ name: 'user_id', nullable: true, comment: '员工ID' })
    userId: number

  @Column({ name: 'work_management_id', nullable: true, comment: '工作管理Id' })
    workManagementId: number

  @ManyToOne(() => AccmWorkManagementEntity)
  @JoinColumn({ name: 'work_management_id' })
    workManagement: AccmWorkManagementEntity

  workContent: string

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
    user: UserEntity

  userName: string

  @Column({ name: 'work_notification', nullable: true, comment: '提示信息' })
    workNotification: string

  @Column({ name: 'work_important', nullable: true, comment: '工作重要等级=1为一般=2为重要' })
    workImportant: number
}
