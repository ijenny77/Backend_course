import { Controller,Post, UnauthorizedException,Body,UseGuards,Get,Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('login')
    async login(@Body() loginDto:LoginDto){
        const user = await this.authService.validateUser(loginDto.username,loginDto.password)
        if(!user){
            throw new UnauthorizedException('Invalid credentials')
        }
        return this.authService.login(user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Req() req) {
        return req.user
    }


}
