import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { UsersDto } from 'src/users/dto/users.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}
  async login(loginUser: LoginDto): Promise<UsersDto> {
    const user = await this.usersRepository.findOne({
      where: { user: loginUser.user },
    });
    if (!user) {
      throw new Error('Esse Usuário não existe');
    }
    const validPassword = await bcrypt.compare(
      loginUser.password,
      user.password,
    );
    if (!validPassword) {
      throw new Error('Usuário não existe ou o password é invalido');
    }
    return user;
  }
}
