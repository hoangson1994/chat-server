import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  password: string;
}
