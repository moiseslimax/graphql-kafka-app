import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloGatewayDriver,
  ApolloGatewayDriverConfig,
} from '@nestjs/apollo';
import { ApolloGateway, IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        context: ({ req }) => ({ headers: req.headers }),
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'user',   url: process.env.USER_URL   ?? 'http://localhost:3001/graphql' },
            { name: 'wallet', url: process.env.WALLET_URL ?? 'http://localhost:3002/graphql' },
          ],
        }),
        buildService: ({ url }) =>
          new RemoteGraphQLDataSource({
            url,
            willSendRequest({ request, context }) {
              const auth = context?.headers?.authorization;
              if (auth) request.http?.headers.set('authorization', auth);
            },
          }),
      },
    }),
  ],
})
export class AppModule {}
