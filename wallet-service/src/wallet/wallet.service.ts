import { Injectable } from '@nestjs/common';
import { Wallet } from './wallet.entity';
import { randomUUID } from 'crypto';
import { CreateWalletInput } from './dto/createWallet.input';

@Injectable()
export class WalletService {
    private wallets: Wallet[] = [];

    create(createWalletinput: CreateWalletInput): Wallet {
        const wallet: Wallet = {
            id: randomUUID(),
            userUuid: createWalletinput.userUuid,
            balance: 0
        }

        this.wallets.push(wallet)

        return wallet;
    }

    findAll(): Wallet[] {
        return this.wallets;
    }
}
