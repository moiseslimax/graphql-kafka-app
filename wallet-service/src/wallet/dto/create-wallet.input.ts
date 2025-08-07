import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateWalletInput {
  @Field()
  userUuid: string;

  @Field()
  balance: number;
}