import { EntityManager, Repository } from 'typeorm';
import { Users } from './users.entity';


export class UserRepository extends Repository<Users> {
    constructor(manger:EntityManager){
        super(Users,manger);
    }
  async findUserWithEmailRegex(pattern: string): Promise<Users[]> {
    const queryBuilder = this.createQueryBuilder('user');
    queryBuilder.where(`user.email LIKE '%${pattern}%'`);
    return await queryBuilder.getMany();
  }
}
