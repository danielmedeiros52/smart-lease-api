import { Injectable } from '@nestjs/common';
import { WalletEntity } from './entities/wallet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { PropertyEntity } from '../property/entities/property.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(WalletEntity)
    private readonly walletEntityRepository: Repository<WalletEntity>,
  ) {}
  async createForUser(userId: string) {
    const user = new UserEntity();
    user.id = userId;
    const wallet = this.createWalletDefault();
    wallet.user = user;
    const walletSaved = await this.walletEntityRepository.save(wallet);

    return {
      id: walletSaved.id,
      balance: walletSaved.balance,
      currency: walletSaved.currency,
    };
  }
  async createForProperty(propertyId: string) {
    const propertyEntity = new PropertyEntity();
    propertyEntity.id = propertyId;
    const wallet = this.createWalletDefault();
    wallet.property = propertyEntity;
    const walletSaved = await this.walletEntityRepository.save(wallet);

    return {
      id: walletSaved.id,
      balance: walletSaved.balance,
      currency: walletSaved.currency,
    };
  }
  createWalletDefault(): WalletEntity {
    const wallet = new WalletEntity();
    wallet.balance = 0;
    wallet.currency = 'BRL';
    return wallet;
  }

  findByUserId(userId: string) {
    console.log('userId', userId);
    return this.walletEntityRepository
      .createQueryBuilder('wallet')
      .where('wallet.userId = :userId', { userId })
      .getOne();
  }
  findAll() {
    return this.walletEntityRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} wallet`;
  }
}
