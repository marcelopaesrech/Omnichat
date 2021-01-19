import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UsersDto } from 'src/users/dto/users.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ResponseLoginDto } from './dto/responseLogin.dto';
import { JwtService } from './jwt/jwt.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}
  @Post()
  async login(@Body() login: LoginDto): Promise<ResponseLoginDto> {
    try {
      const userEntity = await this.authService.login(login);
      const user: UsersDto = {
        id: userEntity.id,
        password: userEntity.password,
        user: userEntity.user,
      };
      const token = await this.jwtService.signin(user);
      return { ...login, ...{ token } };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
