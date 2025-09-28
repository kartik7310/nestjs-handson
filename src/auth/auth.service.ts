import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser-dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { loginDto } from './dto/loginUser-dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(registerUserDto: RegisterDto) {
    const saltRound = 10;
    const hashPassword = await bcrypt.hash(registerUserDto.password, saltRound);

    const user = await this.userService.createUser({
      ...registerUserDto,
      password: hashPassword,
    });
    const payload = { sub: user._id };
    const token = this.jwtService.sign(payload);
    return token;
  }

  async login(loginUserDto: loginDto) {
    const user = await this.userService.login(loginUserDto);
    console.log('user', user);

    const matchPassword = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (!matchPassword) {
      throw new NotFoundException('Invalid email or password');
    }

    const payload = { sub: user._id };
    const token = this.jwtService.sign(payload);
    return token;
  }
}
