import {Column,Entity,PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Report{
    
    @PrimaryGeneratedColumn()
    id:Number;

    @Column()
    price:string;
}