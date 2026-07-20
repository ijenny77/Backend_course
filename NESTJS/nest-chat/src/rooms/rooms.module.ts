import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './rooms.entity';
@Module({
    imports:[TypeOrmModule.forFeature([Room])],
    providers:[],
    controllers:[],
    exports:[],
})
export class RoomsModule {}
