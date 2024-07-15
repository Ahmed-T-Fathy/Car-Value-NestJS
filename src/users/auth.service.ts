import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt, Verify } from 'crypto';
import { promisify } from 'util';
import { Role } from './roles.enum';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {
    // console.log('UsersService:', userService); // Add this line
  }

  async signup(email: string, password: string,role:Role) {
    // check if user is exist
    // console.log("before find on signup");
    const users = await this.userService.find(email);
    // console.log(users);
    if (users.length) {
      throw new BadRequestException('the email is in use!');
    }

    // encrypt password
    const salt: string = await randomBytes(8).toString('hex');
    const hash: Buffer = (await scrypt(password, salt, 32)) as Buffer;
    const result:string=salt+'.'+hash.toString('hex');

    // create new user and save it
    const user=await this.userService.createUser(email,result,role);

    // return user
    return user;
  }

  async  signin(email:string,password:string){
    const [user]=await this.userService.find(email);
    if(!user){
        throw new NotFoundException("this user not found!")
    }

    const [salt,oldPassword]=user.password.split('.');

    const hash=await scrypt(password,salt,32) as Buffer;

    if(oldPassword===hash.toString('hex')){
        return user;
    }else{
        throw new BadRequestException('bad password!'); 
    }

  }
}
