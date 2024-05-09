import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';
import { EmailIsUnique } from '../validate/email.validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name can not be empty' })
  name: string;

  @IsEmail(undefined, { message: 'Email is not valid' })
  @EmailIsUnique({ message: 'Email already exists' })
  email: string;

  @MinLength(6, { message: 'Password could have at least 6 characters' })
  password: string;

  @IsNotEmpty({ message: 'Phone can not be empty' })
  phone: string;

  @Transform(({ value }) => parseInt(value))
  @IsEnum(['ACTIVE', 'INACTIVE', 'PENDING', 'BLOCKED'], {
    message: 'Invalid status',
  })
  @IsOptional()
  status = 'PENDING';
}
