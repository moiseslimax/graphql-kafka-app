import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Wallet } from './wallet.entity';
import { WalletService } from './wallet.service';
import { CreateWalletInput } from './dto/create-wallet.input';

@Resolver(() => Wallet)
export class WalletResolver {
    constructor(private walletService: WalletService){}

    @Query(() => [Wallet])
    getWallets() {
        return this.walletService.findAll()
    }

    @Mutation(() => Wallet)
    createWallet(@Args('input') input: CreateWalletInput){
        return this.walletService.create(input)
    }
}
