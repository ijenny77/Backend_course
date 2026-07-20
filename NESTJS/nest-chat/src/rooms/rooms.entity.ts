import { Column,Entity,ManyToOne,PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/users.entity"; 

@Entity()
export class Room {
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column()
    name:string;
    @ManyToOne(()=>User)
    createdBy:User;
}