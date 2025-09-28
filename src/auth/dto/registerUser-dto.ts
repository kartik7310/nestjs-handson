import { IsEmail, IsString } from 'class-validator';
export class  RegisterDto{
  @IsString()
  name:string

  @IsString()
  lastName:string

  @IsEmail()
  email:string

  @IsString()
  password:string

  @IsString()
  confirmPassword:string
}