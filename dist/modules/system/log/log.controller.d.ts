import { Pagination } from '~/helper/paginate/pagination';
import { CaptchaLogQueryDto, LoginLogQueryDto, TaskLogQueryDto } from './dto/log.dto';
import { CaptchaLogEntity } from './entities/captcha-log.entity';
import { TaskLogEntity } from './entities/task-log.entity';
import { LoginLogInfo } from './models/log.model';
import { CaptchaLogService } from './services/captcha-log.service';
import { LoginLogService } from './services/login-log.service';
import { TaskLogService } from './services/task-log.service';
export declare const permissions: {
    readonly TaskList: "system:log:task:list";
    readonly LogList: "system:log:login:list";
    readonly CaptchaList: "system:log:captcha:list";
};
export declare class LogController {
    private loginLogService;
    private taskService;
    private captchaLogService;
    constructor(loginLogService: LoginLogService, taskService: TaskLogService, captchaLogService: CaptchaLogService);
    loginLogPage(dto: LoginLogQueryDto): Promise<Pagination<LoginLogInfo>>;
    taskList(dto: TaskLogQueryDto): Promise<Pagination<TaskLogEntity, import("~/helper/paginate/interface").IPaginationMeta>>;
    captchaList(dto: CaptchaLogQueryDto): Promise<Pagination<CaptchaLogEntity>>;
}
