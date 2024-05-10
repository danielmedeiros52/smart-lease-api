import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePropertyDto {
  @IsNotEmpty({ message: 'Name can not be empty' })
  name: string;
  @IsNotEmpty({ message: 'price can not be empty' })
  price: number;
  @IsNotEmpty({ message: 'type can not be empty' })
  propertyType: string;
  @IsNotEmpty({ message: 'address can not be empty' })
  address: string;
  @IsNotEmpty({ message: 'city can not be empty' })
  city: string;
  @IsNotEmpty({ message: 'state can not be empty' })
  country: string;
  @IsNotEmpty({ message: 'zip can not be empty' })
  zipcode: string;
  @IsNotEmpty({ message: 'reserveAmount can not be empty' })
  reserveValue: number;
  @IsNotEmpty({ message: 'paymentType can not be empty' })
  paymentType: string;
  @Transform(({ value }) => parseInt(value))
  @IsEnum(['AVAILABLE', 'RENTED', 'MAINTENANCE', 'BLOCKED'], {
    message: 'Invalid status',
  })
  @IsOptional()
  status = 'AVAILABLE';
}
