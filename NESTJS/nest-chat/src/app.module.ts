import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { AuthModule } from './auth/auth.module';
import { RoomsModule } from './rooms/rooms.module';
import { Room } from './rooms/rooms.entity';
import { MessagesModule } from './messages/messages.module';
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(config:ConfigService) => ({
        type:'better-sqlite3',
        database:config.get<string>('DATABASE_PATH'),
        entities:[
          User,
          Room
        ],
        synchronize:true,
      })
    }),
    UsersModule,
    AuthModule,
    RoomsModule,
    MessagesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
