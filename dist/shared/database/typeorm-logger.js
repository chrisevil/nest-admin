"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeORMLogger = void 0;
const common_1 = require("@nestjs/common");
class TypeORMLogger {
    options;
    logger = new common_1.Logger(TypeORMLogger.name);
    constructor(options) {
        this.options = options;
    }
    logQuery(query, parameters, _queryRunner) {
        if (!this.isEnable('query'))
            return;
        const sql = query
            + (parameters && parameters.length
                ? ` -- PARAMETERS: ${this.stringifyParams(parameters)}`
                : '');
        this.logger.log(`[QUERY]: ${sql}`);
    }
    logQueryError(error, query, parameters, _queryRunner) {
        if (!this.isEnable('error'))
            return;
        const sql = query
            + (parameters && parameters.length
                ? ` -- PARAMETERS: ${this.stringifyParams(parameters)}`
                : '');
        this.logger.error([`[FAILED QUERY]: ${sql}`, `[QUERY ERROR]: ${error}`]);
    }
    logQuerySlow(time, query, parameters, _queryRunner) {
        const sql = query
            + (parameters && parameters.length
                ? ` -- PARAMETERS: ${this.stringifyParams(parameters)}`
                : '');
        this.logger.warn(`[SLOW QUERY: ${time} ms]: ${sql}`);
    }
    logSchemaBuild(message, _queryRunner) {
        if (!this.isEnable('schema'))
            return;
        this.logger.log(message);
    }
    logMigration(message, _queryRunner) {
        if (!this.isEnable('migration'))
            return;
        this.logger.log(message);
    }
    log(level, message, _queryRunner) {
        if (!this.isEnable(level))
            return;
        switch (level) {
            case 'log':
                this.logger.debug(message);
                break;
            case 'info':
                this.logger.log(message);
                break;
            case 'warn':
                this.logger.warn(message);
                break;
            default:
                break;
        }
    }
    stringifyParams(parameters) {
        try {
            return JSON.stringify(parameters);
        }
        catch (error) {
            return parameters;
        }
    }
    isEnable(level) {
        return (this.options === 'all'
            || this.options === true
            || (Array.isArray(this.options) && this.options.includes(level)));
    }
}
exports.TypeORMLogger = TypeORMLogger;
//# sourceMappingURL=typeorm-logger.js.map