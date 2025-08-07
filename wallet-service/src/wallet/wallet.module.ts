import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletResolver } from './wallet.resolver';

@Module({
  providers: [WalletService, WalletResolver]
})
export class WalletModule {}
