import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './rooms.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';

@Injectable()
export class RoomsService {
    constructor(@InjectRepository(Room) private roomRepository:Repository<Room>){}
    create(createRoomDto:CreateRoomDto,userId){
        const newRoom = this.roomRepository.create({
            name:createRoomDto.name,
            createdBy:{ id:userId } as User,
        })
        return this.roomRepository.save(newRoom)
    }
    findAll(){
        return this.roomRepository.find()
    }
    findOne(id:string){
        return this.roomRepository.findOneBy({id})
    }
}
