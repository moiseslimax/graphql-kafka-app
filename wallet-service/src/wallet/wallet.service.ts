import { Injectable, OnModuleInit } from '@nestjs/common';
import { Wallet } from './wallet.entity';
import { randomUUID } from 'crypto';
import { CreateWalletInput } from './dto/create-wallet.input';
import { KafkaService } from 'src/kafka/kafka.service';
import { UserCreatedEvent } from './interface/user-created-event.interface';

@Injectable()
export class WalletService implements OnModuleInit {
    constructor(
        private readonly kafkaService: KafkaService
    ) {}
    private wallets: Wallet[] = [];


      async onModuleInit() {
        const consumer = this.kafkaService.getConsumer();

        await consumer.connect();
        await consumer.subscribe({ topic: 'user.created', fromBeginning: false });

        await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            if (!message.value) {
                console.warn('[Kafka] Received message with no value');
                return;
            }
            const data: UserCreatedEvent = JSON.parse(message.value.toString());
            console.log('[Kafka] Received:', data);

            this.create({ userUuid: data.id, balance: 0 });
        },
        });
    }

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

    findByUserUuid(userUuid: string): Wallet | undefined {
        return this.wallets.find(wallet => wallet.userUuid === userUuid)
    }
}
