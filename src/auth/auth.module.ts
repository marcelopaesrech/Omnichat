import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/users.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from './jwt/jwt.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  providers: [AuthService, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
