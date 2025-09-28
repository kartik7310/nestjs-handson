import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDto } from 'src/auth/dto/registerUser-dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
   constructor(@InjectModel(User.name) private  userModal: Model<User>) {}
 async createUser(registerUserDto:RegisterDto){
   return await this.userModal.create({
      name:registerUserDto.name,
      lastName:registerUserDto.lastName,
      email:registerUserDto.email,
      password:registerUserDto.password
    })
  }
}
