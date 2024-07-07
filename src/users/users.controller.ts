import { Body, Controller, Param, Post ,Get, Patch,Delete, NotFoundException, UseInterceptors} from '@nestjs/common';
import { CreateUserDto } from './dtos/create.user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update.user.dto';
import { Serialize} from 'src/interceptors/serialize.interceptor';  
import { UserDto } from './dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('signup')
  createUser(@Body() userObj: CreateUserDto) {
    const { email, password } = userObj;
    return this.usersService.createUser(email, password);
  }

  @Serialize(UserDto)
  @Get(':id')
  async getUser(@Param('id') id: number) {
    const user= await this.usersService.findOne(id);
    if(!user)throw new NotFoundException("user not found!");
    return user;
  }

  @Get()
  getAllUsers(@Body('email') email:string):Promise<User[]>{
    return this.usersService.find(email);
  }

  @Patch(':id')
  updateUser(@Param('id') id:number,@Body() data:UpdateUserDto){
    return this.usersService.update(id,data);
  }

  @Delete(':id')
  deleteUser(@Param('id') id:number){
    return this.usersService.remove(id);
  }
}
