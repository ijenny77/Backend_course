import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'
@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository:Repository<User>){}
    async createUser(createUserDto:CreateUserDto){
        const hashedPassword = await bcrypt.hash(createUserDto.password,10)
        const newUser = this.usersRepository.create({
            username:createUserDto.username,
            email:createUserDto.email,
            password:hashedPassword
        })
        return this.usersRepository.save(newUser)
    }
    async findByUsername(username:string) {
        return this.usersRepository.findOne({where:{username}})
    }
}
