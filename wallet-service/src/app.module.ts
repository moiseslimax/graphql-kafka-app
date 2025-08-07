import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { WalletModule } from './wallet/wallet.module';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,     
    }), WalletModule, KafkaModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
