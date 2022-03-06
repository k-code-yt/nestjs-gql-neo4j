import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { PubsubModule } from './pubsub/pubsub.module';
import { PersonModule } from './domain/person/person.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './database/typeorm.config';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      subscriptions: {
        'subscriptions-transport-ws': {
          onConnect: (ctx) => {
            console.log('ws status => connected', ctx);
            return true;
          },
        },
      },
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    PubsubModule,
    PersonModule,
  ],
})
export class AppModule {}
