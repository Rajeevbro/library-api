import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/user-signUp.dto';
import { User } from './schemas/user.schema';
import { LoginDto } from './dto/user-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user')
  async signup(@Body() user: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(user);
  }

  @Get('user')
  getAllUsers(): Promise<User[]> {
    return this.authService.getUser();
  }

  @Post('user/login')
  userLogin(@Body() user: LoginDto): Promise<{ token: string }> {
    return this.authService.userLogin(user);
  }
}
