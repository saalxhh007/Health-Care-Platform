import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Appointment extends Document {
    @Prop({ required: true })
    doctorId: string;
    
    @Prop({ required: true })
    patientId: string;

    @Prop({ required: true })
    date: Date;

    @Prop({ default: "Pending" })
    status: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);