import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Wallet {
  @Field(() => ID) id: string;
  @Field() userUuid: string;
  @Field() balance: number;
}