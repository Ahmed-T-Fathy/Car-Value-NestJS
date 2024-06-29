import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Patch,
  ValidationPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersEntity } from './users.entity';
import {v4 as uuid}from 'uuid';
@Controller('users')
export class UsersController {
  private readonly users: UsersEntity[] = [];
  @Get()
  find(): UsersEntity[] {
    return this.users;
  }

  @Get(':id')
  findOne(@Param("id",ParseUUIDPipe) id: string): UsersEntity {
    return this.users.find((user:UsersEntity)=>user.id===id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() user: CreateUserDto):UsersEntity {
    const newUser:UsersEntity={
        ...user,
        id:uuid()
    }
    this.users.push(newUser)
    return newUser;
  }

  @Patch(':id')
  update(@Param() id: string, @Body() updateUserDto: UpdateUserDto) {
    const index=this.users.findIndex(user=>user.id===id);
    this.users[index]={...this.users[index],...updateUserDto};
    return this.users[index];
  }
}
