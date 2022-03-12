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
import { PersonResolver } from '../../domain/person/person.resolver';
import { Entities, PersonInput, SubscriberInput } from 'src/schema/graphql';
import { clearDB } from 'src/database/database.utils';
import { SubscriberResolver } from 'src/domain/subscriber/subscriber.resolver';

describe('Subscribe to Track Any Changes', () => {
  let app: INestApplication;
  let personResolver: PersonResolver;
  let subscriberResolver: SubscriberResolver;
  let gqlClient: () => ApolloClient<NormalizedCacheObject>;
  let schema;
  const person: PersonInput = {
    age: 30,
    name: 'Alex Jones',
    title: 'UI/UX',
  };

  const subscriber: SubscriberInput = {
    email: 'john@gmail.com',
  };

  beforeAll(async (done) => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();

    personResolver = moduleFixture.get<PersonResolver>(PersonResolver);
    subscriberResolver =
      moduleFixture.get<SubscriberResolver>(SubscriberResolver);
    schema = app.get(GraphQLSchemaHost).schema;
    done();
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

  afterEach(async (done) => {
    await clearDB();
    done();
  });

  it('resolver should be defined', () => {
    expect(personResolver).toBeDefined();
  });

  it('should return trackAnyChange on subscription', async (done) => {
    try {
      let idx = 0;
      const resolveSubscription = (data) => {
        const {
          trackAnyChange: { __typename, id, ...trackAnyChange },
        } = data;

        if (idx === 0) {
          expect(id).toBeDefined();
          expect(trackAnyChange).toEqual(person);
          expect(__typename).toEqual(Entities.Person);
        }

        if (idx === 1) {
          expect(trackAnyChange).toEqual(subscriber);
          expect(__typename).toEqual(Entities.Subscriber);
          done();
        }
        idx++;
      };

      gqlClient()
        .subscribe({
          query: gql`
            subscription TrackAnyChange {
              trackAnyChange {
                ... on Person {
                  __typename
                  id
                  name
                  title
                  age
                }
                ... on Subscriber {
                  __typename
                  id
                  email
                }
              }
            }
          `,
        })
        .subscribe({
          next({ data }) {
            resolveSubscription(data);
          },
        });

      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(personResolver.addPerson(person));
        }, 100);
      });

      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(subscriberResolver.addSubscriber(subscriber));
        }, 100);
      });
    } catch (error) {
      console.error(error);
    }
  }, 1000);
});
