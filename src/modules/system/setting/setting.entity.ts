import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('sys_setting')
export class SettingEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'name', nullable: true, comment: '应用名称' })
    name: string
}
