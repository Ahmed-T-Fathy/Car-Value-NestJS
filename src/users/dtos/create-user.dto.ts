import { IsEmail, IsString, Length, isEmail } from "class-validator";

export class CreateUserDto {
  @IsString()
  @Length(3,8)
  readonly username: string;
  @IsEmail({},{message:"Invalid Email!"})
  readonly email: string;

  @IsString()
  readonly country: string;
}
