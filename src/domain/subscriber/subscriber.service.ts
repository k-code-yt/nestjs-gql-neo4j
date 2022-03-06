import { Injectable } from '@nestjs/common';
import { SUBSCRIPTION_EVENTS } from 'src/pubsub/pubsub.constants';
import { PubSubService } from 'src/pubsub/pubsub.service';
import { Person, Subscriber, SubscriberInput } from 'src/schema/graphql';
import { SubscriberRepository } from './subscriber.repository';

@Injectable()
export class SubscriberService {
  constructor(
    private readonly pubsubService: PubSubService,
    private subscriberRepository: SubscriberRepository,
  ) {}

  async addSubscriber(subscriber: SubscriberInput): Promise<Subscriber> {
    const subscriberInstance = await this.subscriberRepository.save(subscriber);
    // as unknown as Person
    // this.pubsubService.publish<'trackAnyChange'>(
    //   SUBSCRIPTION_EVENTS.trackAnyChange,
    //   {
    //     trackAnyChange: subscriberInstance,
    //   },
    // );

    return subscriberInstance;
  }
}
