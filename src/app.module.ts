import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { PubsubModule } from './pubsub/pubsub.module';
import { PersonModule } from './domain/person/person.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './database/typeorm.config';
import { SubscriberModule } from './domain/subscriber/subscriber.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      subscriptions: {
        'subscriptions-transport-ws': true,
      },
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    PubsubModule,
    PersonModule,
    SubscriberModule,
  ],
})
export class AppModule {}
