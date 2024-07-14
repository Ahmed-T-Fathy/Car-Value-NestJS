import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Patch,
  Delete,
  NotFoundException,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create.user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update.user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGard } from 'src/guards/auth.gard';
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}
  @Post('createuser')
  createUser(@Body() userObj: CreateUserDto) {
    const { email, password } = userObj;
    return this.usersService.createUser(email, password);
  }

  // @Serialize(UserDto)
  // @Get(':id')
  // async getUser(@Param('id') id: number) {

  //   const user = await this.usersService.findOne(id);
  //   if (!user) throw new NotFoundException('user not found!');
  //   return user;
  // }

  @Get()
  getAllUsers(@Body('email') email: string): Promise<User[]> {
    return this.usersService.find(email);
  }

  @Patch(':id')
  updateUser(@Param('id') id: number, @Body() data: UpdateUserDto) {
    return this.usersService.update(id, data);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.usersService.remove(id);
  }

  @Post('signup')
  async signup(@Body() userDto: CreateUserDto, @Session() session: any) {
    const { email, password } = userDto;
    // console.log("signup");
    const user = await this.authService.signup(email, password);
    session.userId = user.id;
    return user;
  }

  @Post('signin')
  async signin(@Body() userDto: CreateUserDto, @Session() session: any) {
    const { email, password } = userDto;

    const user = await this.authService.signin(email, password);
    // console.log(user );

    session.userId = user.id;
    return user;
  }

  @Get('/colors/:color')
  async setColor(@Param('color') color: string, @Session() session: any) {
    session.color = color;
  }

  @Get('/colors/cookies/dss')
  async getColor(@Session() session: any) {
    console.log('here');
    console.log(session);
    return session.color;
  }

  @Serialize(UserDto)
  @Get('/whoami')
  @UseGuards(AuthGard)
  whoAmI(@CurrentUser() user: string) {
    console.log('here');
    console.log(user);
    return user;
  }
}
