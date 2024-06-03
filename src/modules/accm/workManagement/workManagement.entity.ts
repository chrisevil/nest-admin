import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm'

import { CommonEntity } from '~/common/entity/common.entity'
import { UserEntity } from '~/modules/user/user.entity'

@Entity('accm_work_management')
export class AccmWorkManagementEntity extends CommonEntity {
  @Column({ name: 'user_id', nullable: true, comment: '员工ID' })
    userId: number

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
    user: UserEntity

  userName: string

  @Column({ name: 'work_item_name', nullable: true, comment: '工作内容' })
    workContent: string

  @Column({ name: 'work_start', type: 'date', nullable: true, comment: '起始日期' })
    workStart: Date

  @Column({ name: 'work_end', type: 'date', nullable: true, comment: '结束日期' })
    workEnd: Date

  @Column({ name: 'work_important', nullable: true, comment: '工作重要等级=1为一般=2为重要' })
    workImportant: number

  @Column({ name: 'is_completed', nullable: true, comment: '是否完成工作=0为否=1为是' })
    isCompleted: number
}
