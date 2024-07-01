import { IsEmail, IsString, MinLength, minLength } from "class-validator";

export class CreateUserDto{
    @IsEmail()
    email:string;

    @IsString()
    @MinLength(8)
    password:string;
}