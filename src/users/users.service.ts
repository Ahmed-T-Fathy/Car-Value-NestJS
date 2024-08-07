import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { DataSource, ILike, Like, Repository } from 'typeorm';
import { emit } from 'process';
import { UserRepository } from './user.repository';
import { Role } from './roles.enum';
@Injectable()
export class UsersService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepo: UserRepository,
    private dataSource: DataSource,
  ) {}
  async createUser(email: string, password: string,role:Role) {
    /* Transactions are useful for ensuring that a series of
    database operations either all succeed or
    all fail, maintaining data integrity.*/

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const user = this.userRepo.create({ email, password ,role});
      const savedUser = await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();
      return savedUser;
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  findOne(id: number) {
    return this.userRepo.findOneBy({ id });
  }

  async find(email: string) {
    // console.log('in find');
    return await this.userRepo.findUserWithEmailRegex(email);
  }
  async update(id: number, attrs: Partial<Users>): Promise<Users | null> {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');

    Object.assign(user, attrs);
    return this.userRepo.save(user);
  }

  async remove(id: number) {
    const userToBeDelete = await this.userRepo.findOneBy({ id });
    if (!userToBeDelete) throw new NotFoundException('User not found');

    return this.userRepo.remove(userToBeDelete);
  }
}
