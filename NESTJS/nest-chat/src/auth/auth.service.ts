import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
@Injectable()
export class AuthService {
    constructor(
        private usersService:UsersService,
        private jwtService:JwtService
    ){}
    async validateUser(username:string,password:string){
        const user = await this.usersService.findByUsername(username)
        if(!user) return null;

        const passwordMatches = await bcrypt.compare(password,user.password)
        if(!passwordMatches) return null;

        return user;
    }
    async login(user : { id:string; username:string }){
        const payload = { sub: user.id , username:user.username }
        return{
            access_token : this.jwtService.sign(payload)
        }
    }
}
