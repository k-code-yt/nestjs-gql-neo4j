import { Injectable } from '@nestjs/common';
import { SUBSCRIPTION_EVENTS } from 'src/pubsub/pubsub.constants';
import { PubSubService } from 'src/pubsub/pubsub.service';
import { Entities, Subscriber, SubscriberInput } from 'src/schema/graphql';
import { SubscriberRepository } from './subscriber.repository';

@Injectable()
export class SubscriberService {
  constructor(
    private readonly pubsubService: PubSubService,
    private subscriberRepository: SubscriberRepository,
  ) {}

  async addSubscriber(subscriber: SubscriberInput): Promise<Subscriber> {
    const subscriberInstance = await this.subscriberRepository.save(subscriber);

    this.pubsubService.publish<'trackAnyChange'>(
      SUBSCRIPTION_EVENTS.trackAnyChange,
      {
        trackAnyChange: {
          ...subscriberInstance,
          __typename: Entities.Subscriber,
        },
      },
    );

    return subscriberInstance;
  }
}
