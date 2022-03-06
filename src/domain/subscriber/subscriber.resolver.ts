import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PUB_SUB } from 'src/pubsub/pubsub.module';
import { SubscriberInput } from 'src/schema/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { SubscriberService } from './subscriber.service';

@Resolver()
export class SubscriberResolver {
  constructor(
    @Inject(PUB_SUB) private readonly pubSub: RedisPubSub,
    private readonly subscriberService: SubscriberService,
  ) {}

  @Mutation()
  async addSubscriber(@Args('subscriber') subscriber: SubscriberInput) {
    return await this.subscriberService.addSubscriber(subscriber);
  }
}
