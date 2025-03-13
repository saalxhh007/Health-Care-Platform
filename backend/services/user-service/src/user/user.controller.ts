import { Body, Controller, Get, Param, Post, Request, Sse, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { SignUserDto } from './dto/sign-user.dto';
import { LogUserDto } from './dto/log-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    // Route To Create User
    @Post("register")
    async register(@Body() dto: SignUserDto) {
        return await this.userService.createUser(dto)
    }
    // Route To Login User
    @Post("login")
    async login(@Body() dto: LogUserDto) {
        return await this.userService.logUser(dto)
    }
    // Drop A User
    @Post("/drop/:id")
    getUser(@Param("id") id: number) {
        return this.userService.dropUser({ id });
    }
    // Route To User Profile
    @UseGuards()
    @Get("profile")
    getProfile(@Request() req) {
        return req.user;
    }

    @Sse("availability/:doctorId")
    streamDoctorAvailability(@Param("doctorId") doctorId: number): Observable<any> {
            
        this.userService.startListening(doctorId);
        return this.userService.getDoctorAvailability(doctorId);
    } @Get("availability/:doctorId")
    async checkDoctorAvailability(@Param("doctorId") doctorId: number) {
        const isAvailable = await this.userService.getDoctorAvailability(doctorId);
        return { doctorId, isAvailable };
    }
}
