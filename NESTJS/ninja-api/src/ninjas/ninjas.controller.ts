import { Controller,Delete,Get,Post, Put,Param,Query,Body,ParseIntPipe,NotFoundException, ValidationPipe } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';

@Controller('ninjas')
export class NinjasController {
    constructor(private readonly ninjasService:NinjasService){}
    @Get()
    getNinjas(@Query('weapon') weapon:'stars'|'nunchucks'){
        return this.ninjasService.getNinjas(weapon)
    }
    @Get(':id')
    getOneNinja(@Param('id',ParseIntPipe) id:number){
        try{
            return this.ninjasService.getNinja(id)
        }catch(error){
            throw new NotFoundException()
        }
    }
    @Post()
    create(@Body(new ValidationPipe) createNinjaDto: CreateNinjaDto) {
        return this.ninjasService.createNinja(createNinjaDto)
    }
    @Put(':id')
    update(@Param('id',ParseIntPipe) id:number, @Body() updateNinjaDto:UpdateNinjaDto){
        return this.ninjasService.updateNinja(id,updateNinjaDto)
    }
    @Delete(':id')
    remove(@Param('id',ParseIntPipe) id:number){
        return this.ninjasService.removeNinja(id)
    }
}
