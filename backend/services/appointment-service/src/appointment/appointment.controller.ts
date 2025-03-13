import { Controller, Post } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('appointment')
export class AppointmentController {
    constructor( private readonly appointmentService: AppointmentService ) {}
    
    @GrpcMethod("AppoinmentService", "BookAppointment") 
    async createAppointment(data: CreateAppointmentDto) {
        const appointment = await this.appointmentService.createAppointment(data);
        return {...appointment.toObject()};
    }

    @GrpcMethod("AppoinmentService", "GetAppointmentsByDoctor") 
    async getAppointments(doctorId: string) {
        const appointments = this.appointmentService.getAppointments(doctorId);
        return { appointments };
    }
}
