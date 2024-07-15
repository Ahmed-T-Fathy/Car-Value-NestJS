import { IsEmail, IsEnum, IsString, MinLength, minLength } from "class-validator";
import { Role } from "../roles.enum";

export class CreateUserDto{
    @IsEmail()
    email:string;

    @IsString()
    @MinLength(8)
    password:string;

    @IsEnum(Role)
    role:Role;
}