import { Body, Controller,Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
@Controller('users')
export class UsersController {
    constructor(private usersService:UsersService ){}
    @Post()
    create(@Body(new ValidationPipe) createUserDto:CreateUserDto){
        return this.usersService.createUser(createUserDto)
    }
}
