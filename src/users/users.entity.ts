import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './roles.enum';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({
    type: 'text',
    default: Role.User,
  })
  role:Role;

  @Column()
  password: string;


}
