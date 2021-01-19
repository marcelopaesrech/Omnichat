import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersDto } from './dto/users.dto';
import { User } from './users.decorator';
import { UsersEntity } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get(':id')
  async findOne(@Param() id: number): Promise<UsersDto> {
    return await this.usersService.findById(id);
  }

  @Get()
  async findAll(): Promise<UsersEntity[]> {
    return await this.usersService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createUser: UsersDto): Promise<UsersEntity> {
    try {
      return await this.usersService.create(createUser);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put()
  @HttpCode(204)
  async update(@Body() updateUser: UsersDto): Promise<void> {
    try {
      return await this.usersService.update(updateUser);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() id: number): Promise<void> {
    await this.usersService.delete(id);
  }
}
