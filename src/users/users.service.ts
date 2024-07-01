import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>,
  private dataSource: DataSource) {}
  async createUser(email: string, password: string) {
    /* Transactions are useful for ensuring that a series of
    database operations either all succeed or
    all fail, maintaining data integrity.*/

    
    const queryRunner=this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try{

        const user=this.userRepo.create({email,password});
        const savedUser=await queryRunner.manager.save(user);
        await queryRunner.commitTransaction();
        return savedUser;
    }catch(err){
        console.log(err);
        await queryRunner.rollbackTransaction();
        throw err;
    }finally{
        await queryRunner.release();

    }
    
  }
}
