import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './rooms.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsService {
    constructor(@InjectRepository(Room) private roomRepository:Repository<Room>){}
    create(createRoomDto:CreateRoomDto){
        const newRoom = this.roomRepository.create({
            name:createRoomDto.name
        })
        return this.roomRepository.save(newRoom)
    }
    findAll(){
        return this.roomRepository.find()
    }
}
