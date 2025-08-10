import { Resolver, ResolveReference, ResolveField, Parent } from '@nestjs/graphql';
import { User } from './user.ref';
import { Wallet } from '../wallet/wallet.entity';
import { WalletService } from '../wallet/wallet.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly walletService: WalletService) {}

  @ResolveReference()
  resolveReference(ref: { __typename: 'User'; id: string }) {
    return { id: ref.id };
  }

  @ResolveField(() => Wallet, { nullable: true })
  wallet(@Parent() user: { id: string }) {
    return this.walletService.findByUserUuid(user.id);
  }
}
