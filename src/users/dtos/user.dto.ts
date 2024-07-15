import { Expose } from "class-transformer";
import { Role } from "../roles.enum";

export class UserDto {
    @Expose()
    id:number;

    @Expose()
    email:string;

    @Expose()
    role:Role;
}