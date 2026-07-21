import { Controller, Req, UseGuards,Post,Body, Get } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateRoomDto } from './dto/create-room.dto';

@Controller('rooms')
export class RoomsController {
    constructor(private roomsService:RoomsService){}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createRoomDto:CreateRoomDto,@Req() req){
        return this.roomsService.create(createRoomDto,req.user.userId)
    } 
    @Get()
    findAll(){
        return this.roomsService.findAll()
    }
}
