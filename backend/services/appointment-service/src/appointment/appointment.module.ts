import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointment, AppointmentSchema } from './schemas/appointment-schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Appointment.name, schema: AppointmentSchema}]),],
  providers: [AppointmentService],
  controllers: [AppointmentController]
})
export class AppointmentModule {}