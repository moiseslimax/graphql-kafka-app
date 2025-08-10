import { ObjectType, Field, Directive } from '@nestjs/graphql';
import { Wallet } from '../wallet/wallet.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class User {
  @Field()
  @Directive('@external')
  id: string;

  @Field(() => Wallet, { nullable: true })
  wallet?: Wallet;
}
