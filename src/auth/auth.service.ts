import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser-dto';
import bcrypt from "bcrypt"
@Injectable()
export class AuthService {
  constructor(private readonly userService:UserService){}
  async registerUser(registerUserDto:RegisterDto) {
    console.log("register",registerUserDto);
    
//logic for user register


// 1 check user email exist
// 2 hash the password 
const hashSalt = 10
const hashPassword = await bcrypt.hash(registerUserDto.password,hashSalt)
// 3 store the user in db
// 4 generate jwt token
// 5 send response

return this.userService.createUser({...registerUserDto,password:hashPassword})
   
  }
}
