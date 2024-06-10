import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MESSAGES } from '../../common/constans/messages';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  canActivate(context: ExecutionContext) {
    const skipJwtAuth = Reflect.getMetadata(
      'skipJwtAuth',
      context.getHandler(),
    );

    if (skipJwtAuth) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw new UnauthorizedException(MESSAGES.AUTHORIZATION_ERROR);
    }
    return user;
  }
}
