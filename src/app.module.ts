import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { AppResolver } from './app.resolver';
import { PubsubModule } from './pubsub/pubsub.module';
import { PersonModule } from './person/person.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      subscriptions: {
        'graphql-ws': true,
      },
    }),
    PubsubModule,
    PersonModule,
  ],
  controllers: [],
  providers: [AppResolver],
})
export class AppModule {}
