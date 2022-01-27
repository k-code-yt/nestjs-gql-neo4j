import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { SUBSCRIPTION_EVENTS } from 'src/person/person.resolver';
import { PUB_SUB } from './pubsub.module';

@Injectable()
export class PubsubService {
  constructor(
    @Inject(forwardRef(() => PUB_SUB)) private readonly pubSub: PubSub,
  ) {}

  sub() {
    return this.pubSub.asyncIterator(SUBSCRIPTION_EVENTS.NEW_PERSON);
  }
}
