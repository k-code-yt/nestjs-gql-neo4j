import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PUB_SUB } from 'src/pubsub/pubsub.module';
import { Person, PersonInput } from 'src/schema/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';

enum SUBSCRIPTION_EVENTS {
  newPerson = 'newPerson',
}

@Resolver()
export class PersonResolver {
  allSubscribers: Person[] = [];
  constructor(@Inject(PUB_SUB) private readonly pubSub: RedisPubSub) {}

  @Mutation()
  addPerson(@Args('person') person: PersonInput) {
    this.allSubscribers.push(person);
    this.pubSub.publish(SUBSCRIPTION_EVENTS.newPerson, { newPerson: person });
    return person;
  }

  @Subscription()
  newPerson() {
    return this.pubSub.asyncIterator(SUBSCRIPTION_EVENTS.newPerson);
  }
}
