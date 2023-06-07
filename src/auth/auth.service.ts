import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

import { SignUpDto } from './dto/user-signUp.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/user-login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ name, email, password: hashedPassword });
    const response = await user.save();
    const token = this.jwtService.sign({ id: response._id });
    return { token: token };
  }

  async getUser(): Promise<User[]> {
    return await this.userModel.find();
  }
  async userLogin(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });
    console.log(user);
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        return { token: this.jwtService.sign({ id: user._id }) };
      }
    }
    throw new UnauthorizedException('Invalid email or password');
  }
}
