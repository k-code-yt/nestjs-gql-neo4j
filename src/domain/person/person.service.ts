import { Injectable } from '@nestjs/common';
import { SUBSCRIPTION_EVENTS } from 'src/pubsub/pubsub.constants';
import { PubSubService } from 'src/pubsub/pubsub.service';
import { Person, PersonInput } from 'src/schema/graphql';
import { PersonRepository } from './person.repository';

@Injectable()
export class PersonService {
  constructor(
    private readonly personRepository: PersonRepository,
    private readonly pubsubService: PubSubService,
  ) {}

  async addPerson(person: PersonInput) {
    const personInstance = await this.personRepository.save(person);
    this.pubsubService.publish<'trackAnyChange'>(
      SUBSCRIPTION_EVENTS.trackAnyChange,
      {
        trackAnyChange: personInstance,
      },
    );
    return personInstance;
  }
}
