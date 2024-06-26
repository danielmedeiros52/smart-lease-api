import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { AuthGuard } from '../auth/auth.guard';
import { AccessGroup } from '../../pipes/authgoup';

@Controller('wallets')
@UseGuards(AuthGuard)
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get()
  @AccessGroup('USER')
  findAll() {
    return this.walletService.findAll();
  }

  @Get(':id')
  @AccessGroup('USER')
  findOne(@Param('id') id: string) {
    return this.walletService.findOne(+id);
  }
}
