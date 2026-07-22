import { Column, Entity,ManyToOne,CreateDateColumn,PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/users.entity";
import { Room } from "src/rooms/rooms.entity";

@Entity()
export class Message {
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column()
    content:string;
    @ManyToOne(()=>User)
    sender:User;
    @ManyToOne(()=>Room)
    room:Room;
    @CreateDateColumn()
    createdAt:Date;
}