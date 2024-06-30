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
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {

  constructor (private readonly userService:UsersService){}
  @Get()
  find(): UsersEntity[] {
    return this.userService.findUsers();
  }

  @Get(':id')
  findOne(@Param("id",ParseUUIDPipe) id: string): UsersEntity {
    return this.userService.findUserById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() user: CreateUserDto):UsersEntity {
    
    return this.userService.createUser(user);
  }

  @Patch(':id')
  update(@Param() id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }
}
