import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { UsersEntity } from 'src/users/users.entity';
import { JwtService } from './jwt/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(JwtService)
    private readonly jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      return false;
    }
    const [, token] = request.headers.authorization.trim().split(' ');
    const user = await this.jwtService.verify(token);
    request.user = user;
    return true;
  }

  async validateToken(headerToken: string): Promise<UsersEntity> {
    const [bearer, token] = headerToken.trim().split(' ');
    if (bearer !== 'Bearer') {
      throw new HttpException('Token não é válido', HttpStatus.FORBIDDEN);
    }
    try {
      return await this.jwtService.verify(token);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.FORBIDDEN);
    }
  }
}
