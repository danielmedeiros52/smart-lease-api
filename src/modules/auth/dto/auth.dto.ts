import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthDto {
  @IsEmail(undefined, { message: 'Email is not valid' })
  email: string;

  @IsNotEmpty({ message: 'Password should not be blank' })
  password: string;
}
