import { Injectable } from '@nestjs/common';
import { UsersEntity } from './users.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { v4 as uuid } from 'uuid';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {

    private readonly users:UsersEntity[]=[]
    findUsers(): UsersEntity[]{
        return this.users;
    }

    findUserById(id: string): UsersEntity{
        return this.users.find((user: UsersEntity) => user.id === id);
    }
    createUser(user: CreateUserDto): UsersEntity{
        const newUser = {
            ...user,id:uuid()
        }
        this.users.push(newUser);
        return newUser;
    }

    updateUser(id: string, updateUserDto: UpdateUserDto): UsersEntity{
        const index = this.users.findIndex(user => user.id === id);
        this.users[index] = { ...this.users[index], ...updateUserDto };
        return this.users[index];
    }
}
