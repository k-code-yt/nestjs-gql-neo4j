import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Person, PersonInput } from 'src/schema/graphql';
import { PersonService } from './person.service';

@Resolver()
export class PersonResolver {
  constructor(private readonly personService: PersonService) {}

  @Mutation()
  async createPerson(
    @Args('personInput') personInput: PersonInput,
  ): Promise<Person> {
    return await this.personService.createPerson(personInput);
  }

  @Query()
  async getPerson(@Args('id') id: number): Promise<Person> {
    return await this.personService.getPerson(id);
  }

  @Mutation()
  async deletePerson(@Args('id') id: number): Promise<Boolean> {
    return await this.personService.deletePerson(id);
  }

  @Mutation()
  async updatePerson(
    @Args('id') id: number,
    @Args('personInput') personInput: PersonInput,
  ): Promise<Person> {
    return await this.personService.updatePerson(id, personInput);
  }
}
