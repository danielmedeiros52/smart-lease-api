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

  findOne(id: string) {
    return this.propertyEntityRepository.findOne({ where: { id } });
    // .createQueryBuilder('property')
    // .leftJoinAndSelect('property.owner', 'owner')
    // .leftJoinAndSelect('property.address', 'address')
    // .leftJoinAndSelect('property.wallet', 'wallet')
    // .where('property.id = :id', { id })
    // .getOne();
  }
  update(id: string, updatePropertyDto: UpdatePropertyDto) {
    const property = Object.assign(new PropertyEntity(), updatePropertyDto);
    return this.propertyEntityRepository.update(id, property);
  }
}
