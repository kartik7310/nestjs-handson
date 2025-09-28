import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDto } from 'src/auth/dto/registerUser-dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { loginDto } from 'src/auth/dto/loginUser-dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModal: Model<User>) {}

  async createUser(registerUserDto: RegisterDto) {
    try {
      return await this.userModal.create({
        name: registerUserDto.name,
        lastName: registerUserDto.lastName,
        email: registerUserDto.email,
        password: registerUserDto.password,
      });
    } catch (error) {
      const DUPLICATE_CODE_KEY = 11000;
      if (error.code == DUPLICATE_CODE_KEY) {
        throw new ConflictException(error.errmsg);
      }
      throw error;
    }
  }

  async login(loginUserDto: loginDto) {
    try {
      const user = await this.userModal.findOne({ email: loginUserDto.email });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      const DUPLICATE_CODE_KEY = 11000;
      if (error.code == DUPLICATE_CODE_KEY) {
        throw new ConflictException(error.errmsg);
      }
      throw error;
    }
  }
  async getUserBYId(id: string) {
    return await this.userModal.findOne({ _id: id });
  }
}
