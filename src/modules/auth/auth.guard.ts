import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

export interface RequestWithUser extends Request {
  user: UserPayload;
}

export interface UserPayload {
  sub: number;
  email: string;
  accessGroup: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const token = this.extractToken(request);
    if (!token) throw new UnauthorizedException('User not authenticated');
    try {
      const payload = await this.jwtService.verifyAsync<UserPayload>(token);
      request.user = payload;

      const requiredGroup = this.getRequiredAccessGroup(context);
      if (
        !this.isUserInRequiredGroup(payload, requiredGroup) &&
        requiredGroup !== undefined
      ) {
        throw new ForbiddenException(
          'User does not have the required access group',
        );
      }
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException('Invalid Token');
      } else if (error instanceof ForbiddenException) {
        throw new ForbiddenException(error.message);
      } else {
        throw new UnauthorizedException('User not authenticated');
      }
    }
    return true;
  }

  private extractToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private getRequiredAccessGroup(context: ExecutionContext): string {
    const handler = context.getHandler();
    const classRef = context.getClass();

    return (
      Reflect.getMetadata('accessGroup', handler) ||
      Reflect.getMetadata('accessGroup', classRef)
    );
  }

  private isUserInRequiredGroup(
    user: UserPayload,
    requiredGroup: string,
  ): boolean {
    return (
      user.accessGroup === requiredGroup || user.accessGroup === 'ADMIN_SMART'
    );
  }
}
