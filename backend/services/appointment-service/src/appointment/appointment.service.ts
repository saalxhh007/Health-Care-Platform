import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment } from './schemas/appointment-schema';
import { Model } from 'mongoose';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentService {
    constructor(
        @InjectModel(Appointment.name) private appointmentModel: Model<Appointment>
    ) { }
    
    async createAppointment(data: CreateAppointmentDto): Promise<Appointment> {
        return (await this.appointmentModel.create(data)).save();
    }

    async getAppointments(doctorId: string): Promise<Appointment[]> {
        return this.appointmentModel.find({ doctorId }).exec();
    }
}
