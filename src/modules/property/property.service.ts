import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PropertyEntity } from './entities/property.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletService } from '../wallet/wallet.service';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(PropertyEntity)
    private readonly propertyEntityRepository: Repository<PropertyEntity>,
    private readonly walletService: WalletService,
  ) {}
  async create(createPropertyDto: CreatePropertyDto) {
    const property = new PropertyEntity();
    Object.assign(property, createPropertyDto);
    const propertySaved = await this.propertyEntityRepository.save(property);
    await this.walletService.createForProperty(propertySaved.id);
    return propertySaved;
  }

  findAll() {
    return this.propertyEntityRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} property`;
  }

  update(id: number, updatePropertyDto: UpdatePropertyDto) {
    return `This action updates a #${id} property`;
  }

  remove(id: number) {
    return `This action removes a #${id} property`;
  }
}
