import { EntityManager, Repository } from 'typeorm';
import { User } from './user.entity';


export class UserRepository extends Repository<User> {
    constructor(manger:EntityManager){
        super(User,manger);
    }
  async findUserWithEmailRegex(pattern: string): Promise<User[]> {
    const queryBuilder = this.createQueryBuilder('user');
    queryBuilder.where(`user.email LIKE '%${pattern}%'`);
    return await queryBuilder.getMany();
  }
}
