import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentModule } from './appointment/appointment.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost:27017/appointment-container"), AppointmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
