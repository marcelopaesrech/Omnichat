import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersDto } from './dto/users.dto';
import { UsersEntity } from './users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async create(createUser: UsersDto): Promise<UsersEntity> {
    const existUser = await this.usersRepository.findOne({
      where: { user: createUser.user },
    });
    if (existUser) {
      throw new Error('Esse Usuário já existe');
    }
    const hash = await bcrypt.hash(
      createUser.password,
      Number(process.env.BCRYPT_SALTROUNDS),
    );
    createUser.password = hash;
    return this.usersRepository.save(createUser);
  }

  async findById(id: number): Promise<UsersDto> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async update(userUpdate: UsersDto): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: {
        id: userUpdate.id,
      },
    });
    user.user = userUpdate.user;
    user.password = userUpdate.password;
    await this.usersRepository.save(user);
  }

  async findAll(): Promise<UsersEntity[]> {
    return this.usersRepository.find();
  }
}
