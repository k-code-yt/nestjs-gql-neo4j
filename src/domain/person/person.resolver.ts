import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PersonInput } from 'src/schema/graphql';
import { PersonService } from './person.service';

@Resolver()
export class PersonResolver {
  constructor(private readonly personService: PersonService) {}

  @Mutation()
  async addPerson(@Args('person') person: PersonInput) {
    return await this.personService.addPerson(person);
  }
}
