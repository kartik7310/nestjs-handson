import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser-dto';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';

import { loginDto } from './dto/loginUser-dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterDto) {
    const token = await this.authService.registerUser(registerUserDto);
   return {
       success: true,
      message:"signup successfully",
      status:200,
      token:token
    }
  }

  @Post('login')
  async login(@Body() loginUserDto: loginDto) {
    const token = await this.authService.login(loginUserDto);
    return {
       success: true,
      message:"login successfully",
      status:200,
      token
    }
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  async getProfile(@Request() req) {
    const userId = req.user.sub;
    const user = await this.userService.getUserBYId(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { password: _password, ...userWithoutPassword } = user.toObject();
    return {
      success: true,
      data: userWithoutPassword,
      message: 'User profile fetched successfully',
    };
  }
}
