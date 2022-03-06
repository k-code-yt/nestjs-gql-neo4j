import { Resolver, Subscription } from '@nestjs/graphql';
import { SUBSCRIPTION_EVENTS } from './pubsub.constants';
import { PubSubService } from './pubsub.service';

@Resolver()
export class PubsubResolver {
  constructor(private readonly pubsubService: PubSubService) {}

  @Subscription()
  trackAnyChange() {
    return this.pubsubService.subscribe(SUBSCRIPTION_EVENTS.trackAnyChange);
  }
}
