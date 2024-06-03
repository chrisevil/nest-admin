"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SYS_TASK_QUEUE_PREFIX = exports.SYS_TASK_QUEUE_NAME = exports.TaskType = exports.TaskStatus = void 0;
var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["Disabled"] = 0] = "Disabled";
    TaskStatus[TaskStatus["Activited"] = 1] = "Activited";
})(TaskStatus || (exports.TaskStatus = TaskStatus = {}));
var TaskType;
(function (TaskType) {
    TaskType[TaskType["Cron"] = 0] = "Cron";
    TaskType[TaskType["Interval"] = 1] = "Interval";
})(TaskType || (exports.TaskType = TaskType = {}));
exports.SYS_TASK_QUEUE_NAME = 'system:sys-task';
exports.SYS_TASK_QUEUE_PREFIX = 'system:sys:task';
//# sourceMappingURL=constant.js.map