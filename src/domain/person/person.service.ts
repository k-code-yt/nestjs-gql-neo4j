import { Injectable } from '@nestjs/common';
import { SUBSCRIPTION_EVENTS } from 'src/pubsub/pubsub.constants';
import { PubSubService } from 'src/pubsub/pubsub.service';
import { Entities, Person, PersonInput } from 'src/schema/graphql';
import { PersonRepository } from './person.repository';

@Injectable()
export class PersonService {
  constructor(
    private readonly personRepository: PersonRepository,
    private readonly pubsubService: PubSubService,
  ) {}

  async addPerson(person: PersonInput): Promise<Person> {
    const personInstance = await this.personRepository.save(person);
    this.pubsubService.publish<'trackAnyChange'>(
      SUBSCRIPTION_EVENTS.trackAnyChange,
      {
        trackAnyChange: { ...personInstance, __typename: Entities.Person },
      },
    );

    return personInstance;
  }
}
