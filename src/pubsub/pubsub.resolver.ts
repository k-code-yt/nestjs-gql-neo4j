import { forwardRef, Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PubSub } from 'graphql-subscriptions';
import { SUBSCRIPTION_EVENTS } from 'src/person/person.resolver';
import { PUB_SUB } from 'src/pubsub/pubsub.module';
import { PubsubService } from './pubsub.service';

@Resolver()
export class PubSubResolver {
  constructor(private readonly pubSubService: PubsubService) {}

  @Subscription()
  newPerson() {
    return this.pubSubService.sub();
  }
}
