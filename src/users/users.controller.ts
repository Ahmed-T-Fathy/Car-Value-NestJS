import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create.user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor (private readonly usersService:UsersService){}
  @Post('signup')
  createUser(@Body() userObj: CreateUserDto) {
    const { email, password } = userObj;
    return this.usersService.createUser(email,password);
  }
}
