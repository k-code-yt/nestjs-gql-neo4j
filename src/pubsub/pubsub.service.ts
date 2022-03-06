import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PUB_SUB } from 'src/pubsub/pubsub.module';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { SUBSCRIPTION_EVENTS } from 'src/pubsub/pubsub.constants';
import { ISubscription } from 'src/schema/graphql';

@Injectable()
export class PubSubService {
  constructor(
    @Inject(forwardRef(() => PUB_SUB))
    private readonly pubSubProvider: RedisPubSub,
  ) {}

  public publish<
    SubFunctionName extends keyof Omit<ISubscription, '__typename'>,
  >(
    trigger: SUBSCRIPTION_EVENTS,
    payload: {
      [key in SubFunctionName]: ReturnType<ISubscription[SubFunctionName]>;
    },
  ) {
    this.pubSubProvider.publish(trigger, payload);
  }

  public subscribe(trigger: SUBSCRIPTION_EVENTS) {
    return this.pubSubProvider.asyncIterator(trigger);
  }
}
