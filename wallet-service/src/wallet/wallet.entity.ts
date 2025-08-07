import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Wallet {
    @Field(() => ID)
    id: string;

    @Field()
    userUuid: string;

    @Field()
    balance: number;
}