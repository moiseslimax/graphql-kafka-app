import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,     
    }),UserModule, KafkaModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
