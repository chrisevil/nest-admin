import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger;
    constructor();
    catch(exception: unknown, host: ArgumentsHost): void;
    registerCatchAllExceptionsHook(): void;
}
