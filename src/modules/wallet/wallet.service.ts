import { Injectable } from '@nestjs/common';
import { WalletEntity } from './entities/wallet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(WalletEntity)
    private readonly walletEntityRepository: Repository<WalletEntity>,
  ) {}
  async createForUser(userId: string) {
    const wallet = new WalletEntity();
    wallet.user = userId;
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
