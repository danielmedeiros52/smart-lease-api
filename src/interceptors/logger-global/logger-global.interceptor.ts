import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request, Response } from 'express';
import { RequestWithUser } from '../../modules/auth/auth.guard';

@Injectable()
export class LoggerGlobalInterceptor implements NestInterceptor {
  constructor(private logger: ConsoleLogger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextHttp = context.switchToHttp();

    const request = contextHttp.getRequest<Request | RequestWithUser>();
    const response = contextHttp.getResponse<Response>();

    const { path, method } = request;
    const { statusCode } = response;
    this.logger.log(`${method} ${path}`);

    const requestStartTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        if ('user' in request) {
          this.logger.log(
            `Endpoint accessed by user: ${request.user.sub} (${request.user.email})`,
          );
        }
        const endpointExecutionTime = Date.now() - requestStartTime;
        this.logger.log(
          `response: status ${statusCode} - ${endpointExecutionTime}ms`,
        );
      }),
    );
  }
}
