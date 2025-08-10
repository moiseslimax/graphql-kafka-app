import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { WalletModule } from './wallet/wallet.module';
import { KafkaModule } from './kafka/kafka.module';
import { UserResolver } from './user/user.resolver';
import { WalletService } from './wallet/wallet.service';

@Module({
  imports: [ GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      playground: true,
      sortSchema: true,     
    }), WalletModule, KafkaModule],
  controllers: [AppController],
  providers: [AppService, UserResolver, WalletService],
})

export class AppModule {}
