import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(config:ConfigService) => ({
        type:'better-sqlite3',
        database:config.get<string>('DATABASE_PATH'),
        entities:[],
        synchronize:true,
      })
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
