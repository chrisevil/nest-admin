import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator'

export class accmWorkManagementDto {
  @ApiProperty({ description: '员工ID' })
  @IsNumber()
    userId?: number

  @ApiProperty({ description: '工作内容' })
  @IsString()
    workContent?: string

  @ApiProperty({ description: '起始日期' })
  @IsDate()
    workStart?: Date

  @ApiProperty({ description: '结束日期' })
  @IsDate()
    workEnd?: Date

  @ApiProperty({ description: '工作重要等级' })
  @IsNumber()
    workImportant?: number

  @ApiProperty({ description: '是否完成工作=0为否=1为是' })
  @IsNumber()
    isCompleted?: number
}

export class accmWorkManagementQueryDto {
  @ApiProperty({ description: '员工姓名' })
  @IsString()
  @IsOptional()
    userName?: string

  @ApiProperty({ description: '工作内容' })
  @IsString()
  @IsOptional()
    workContent?: string

  @ApiProperty({ description: '起始日期' })
  @IsOptional()
    workStart?: Date

  @ApiProperty({ description: '结束日期' })
  @IsOptional()
    workEnd?: Date

  @ApiProperty({ description: '工作重要等级=1为一般=2为重要' })
  @IsNumber()
  @IsOptional()
    workImportant?: number

  @ApiProperty({ description: '是否完成工作=0为否=1为是' })
  @IsNumber()
  @IsOptional()
    isCompleted?: number
}
