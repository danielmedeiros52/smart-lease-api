import { Injectable } from '@nestjs/common';
import { WalletEntity } from './entities/wallet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(WalletEntity)
    private readonly walletEntityRepository: Repository<WalletEntity>,
  ) {}
  async createForUser(userId: string) {
    const wallet = new WalletEntity();
    const user = new UserEntity();
    user.id = userId;
    wallet.user = user;
    wallet.balance = 0;
    wallet.currency = 'BRL';
    const walletSaved = await this.walletEntityRepository.save(wallet);

    return {
      id: walletSaved.id,
      balance: walletSaved.balance,
      currency: walletSaved.currency,
    };
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
