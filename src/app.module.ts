import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { SocketModule } from './socket/socket.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [  
      ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGODB_URI ||
            'mongodb+srv://eliperel20:L4ebUmuPQqSAqrRc@cluster0.rupsaoq.mongodb.net/taskdb?retryWrites=true&w=majority'),
      TaskModule, 
      SocketModule,
      IoAdapter
  ],
  controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
