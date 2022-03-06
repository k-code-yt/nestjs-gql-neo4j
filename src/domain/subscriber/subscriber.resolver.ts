import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Subscriber, SubscriberInput } from 'src/schema/graphql';
import { SubscriberService } from './subscriber.service';

@Resolver()
export class SubscriberResolver {
  constructor(private readonly subscriberService: SubscriberService) {}

  @Mutation()
  async addSubscriber(
    @Args('subscriber') subscriber: SubscriberInput,
  ): Promise<Subscriber> {
    return await this.subscriberService.addSubscriber(subscriber);
  }
}
