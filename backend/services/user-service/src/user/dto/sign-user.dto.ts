import { IsEmail, IsEnum, IsNumber, IsString } from "class-validator";

export class SignUserDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsNumber()
    age: number;

    @IsString()
    phoneNumber: string;

    @IsString()
    address: string;

    @IsEnum(["male", "female"])
    gender: "male" | "female"
    
    @IsString()
    state: string;

    @IsEnum(["patient", "doctor", "administrator"])
    role: "patient" | "doctor" | "administrator"
}
