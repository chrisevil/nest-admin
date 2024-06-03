import { Logger as ITypeORMLogger, LoggerOptions, QueryRunner } from 'typeorm';
export declare class TypeORMLogger implements ITypeORMLogger {
    private options;
    private logger;
    constructor(options: LoggerOptions);
    logQuery(query: string, parameters?: any[], _queryRunner?: QueryRunner): void;
    logQueryError(error: string | Error, query: string, parameters?: any[], _queryRunner?: QueryRunner): void;
    logQuerySlow(time: number, query: string, parameters?: any[], _queryRunner?: QueryRunner): void;
    logSchemaBuild(message: string, _queryRunner?: QueryRunner): void;
    logMigration(message: string, _queryRunner?: QueryRunner): void;
    log(level: 'warn' | 'info' | 'log', message: any, _queryRunner?: QueryRunner): void;
    private stringifyParams;
    private isEnable;
}
