import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const { method, url, body } = request;
    const now = Date.now();

    this.logger.log(
      `Incoming Request: ${method} ${url}`,
      JSON.stringify({
        method,
        url,
        body: this.sanitizeBody(body),
        timestamp: new Date().toISOString(),
      }),
    );

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - now;
        this.logger.log(
          `Completed Request: ${method} ${url} - ${duration}ms`,
          JSON.stringify({
            method,
            url,
            duration,
            timestamp: new Date().toISOString(),
          }),
        );
      }),
    );
  }

  private sanitizeBody(body: any): any {
    if (!body) return body;
    
    const sanitized = { ...body };
    
    // Remove sensitive fields
    if (sanitized.senha) sanitized.senha = '[REDACTED]';
    if (sanitized.password) sanitized.password = '[REDACTED]';
    
    return sanitized;
  }
}