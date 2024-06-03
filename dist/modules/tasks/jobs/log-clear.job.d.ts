import { LoginLogService } from '~/modules/system/log/services/login-log.service';
import { TaskLogService } from '~/modules/system/log/services/task-log.service';
export declare class LogClearJob {
    private loginLogService;
    private taskLogService;
    constructor(loginLogService: LoginLogService, taskLogService: TaskLogService);
    clearLoginLog(): Promise<void>;
    clearTaskLog(): Promise<void>;
}
