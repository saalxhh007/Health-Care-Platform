import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcryptjs";
import { Observable, Subject } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';
import { SignUserDto } from './dto/sign-user.dto';
import { LogUserDto } from './dto/log-user.dto';

interface AvailabilityRequest {
    id: number;
}
interface AvailabilityResponse {
    available: boolean;
}

interface DoctorService {
    streamDoctorAvailability(request: AvailabilityRequest): Observable<AvailabilityResponse>;
    getDoctorAvailability(doctorId: number): Observable<AvailabilityResponse>;
}

@Injectable()
export class UserService implements OnModuleInit {
    private doctorService: DoctorService;
    private availabilityUpdates$ = new Subject<any>();

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @Inject("DOCTOR_SERVICE")
        private client: ClientGrpc
    ) {}

    async createUser(dto: SignUserDto): Promise<User> {
        const salt = await bcrypt.genSalt(10);
        dto.password = await bcrypt.hash(dto.password, salt);
        const user = this.userRepository.create({
            email: dto.email,
            password: dto.password,
            firstName: dto.firstName,
            lastName: dto.lastName,
            age: dto.age,
            phoneNumber: dto.phoneNumber,
            address: dto.address,
            gender: dto.gender,
            state: dto.state,
            role: dto.role,
        });
        return this.userRepository.save(user);  
    }

    async logUser({ email, password }: LogUserDto): Promise<User | null> {  
        const user = await this.userRepository.findOne({ where: { email } });  
        if (user && (await bcrypt.compare(password, user.password))) {  
            return user;  
        }  
        return null;  
    }  

    async getUser({ id }) {
        return this.userRepository.findOne({ where: { id } });
    }

    async dropUser({ id }) {
        return this.userRepository.delete({ id })
    }
    onModuleInit() {  
        this.doctorService = this.client.getService<DoctorService>('DoctorService');  
    }  

    startListening(doctorId: number) {  
        const request: AvailabilityRequest = { id: doctorId }
        const stream = this.doctorService.streamDoctorAvailability(request);
        stream.subscribe({
            next: (data) => {  
                console.log(`Received doctor update: ${JSON.stringify(data)}`);  
                this.availabilityUpdates$.next(data);  
            },  
            error: (err) => console.error('Grpc Error ', err),  
            complete: () => console.log('stream closed'),  
        });  
    }
     
    getDoctorAvailability(doctorId: number): Observable<any> {  
        return this.doctorService.getDoctorAvailability(doctorId);  
    }  
}