import { Server, WebSocket } from 'mock-socket-with-protocol';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { gql } from 'apollo-server-core';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';
import { InMemoryCache } from '@apollo/client/cache';
import { WebSocketLink } from '@apollo/client/link/ws';
import { GraphQLSchemaHost } from '@nestjs/graphql';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PersonResolver } from '../person.resolver';
import { PersonInput } from 'src/schema/graphql';

describe('PersonResolver', () => {
  let app: INestApplication;
  let resolver: PersonResolver;
  let gqlClient: () => ApolloClient<NormalizedCacheObject>;
  let schema;
  const person: PersonInput = {
    email: 'john@gmail.com',
    name: 'John',
    id: 1,
  };
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();

    resolver = moduleFixture.get<PersonResolver>(PersonResolver);
    schema = app.get(GraphQLSchemaHost).schema;
  });

  beforeEach(() => {
    gqlClient = () => {
      const RANDOM_WS_PORT = Math.floor(Math.random() * 10000);
      const WS_URI = `ws://localhost:${RANDOM_WS_PORT}`;
      const customServer = new Server(WS_URI);

      SubscriptionServer.create(
        {
          schema,
          execute,
          subscribe,
        },
        customServer,
      );

      const wsLink = new WebSocketLink({
        uri: WS_URI,
        webSocketImpl: WebSocket,
      });

      return new ApolloClient({
        link: wsLink,
        cache: new InMemoryCache(),
      });
    };
  });

  it('resolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return newPerson on subscription', (done) => {
    gqlClient()
      .subscribe({
        query: gql`
          subscription Subscription {
            newPerson {
              id
              name
              email
            }
          }
        `,
      })
      .subscribe({
        next({ data }) {
          console.log(data);
          const {
            newPerson: { __typename, ...newPerson },
          } = data;
          expect(newPerson).toEqual(person);
          expect(__typename).toEqual('Person');
          done();
        },
        error(error) {
          console.log(error);
          done();
        },
      });

    setTimeout(() => {
      resolver.addPerson(person);
    }, 100);
  }, 2000);
});
