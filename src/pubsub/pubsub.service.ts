import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PUB_SUB } from 'src/pubsub/pubsub.module';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { SUBSCRIPTION_EVENTS } from 'src/pubsub/pubsub.constants';

@Injectable()
export class PubSubService {
  constructor(
    @Inject(forwardRef(() => PUB_SUB))
    private readonly pubSubProvider: RedisPubSub,
  ) {}

  public publish(trigger: SUBSCRIPTION_EVENTS, payload) {
    this.pubSubProvider.publish(trigger, payload);
  }

  public subscribe(trigger: SUBSCRIPTION_EVENTS) {
    return this.pubSubProvider.asyncIterator(trigger);
  }
}
