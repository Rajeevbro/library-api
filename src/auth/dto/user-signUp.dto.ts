import { IsEmail, IsNotEmpty, IsString, Max, MinLength } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'password Cannot be empty' })
  @MinLength(6)
  password: string;
}
