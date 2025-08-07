import { Injectable } from '@nestjs/common';
import { Wallet } from './wallet.entity';
import { randomUUID } from 'crypto';
import { CreateWalletInput } from './dto/create-wallet.input';
import { KafkaService } from 'src/kafka/kafka.service';

@Injectable()
export class WalletService {
    constructor(
        private readonly kafkaService: KafkaService
    ) {}
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
