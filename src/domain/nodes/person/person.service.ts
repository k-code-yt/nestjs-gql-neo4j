import { Injectable } from '@nestjs/common';
import { QueryRepository } from 'src/neo4j/query.repository';
import { Person, PersonInput } from 'src/schema/graphql';
import { PersonRepository } from './person.repository';

@Injectable()
export class PersonService {
  constructor(private readonly personRepository: PersonRepository) {}

  async createPerson(personInput: PersonInput): Promise<Person> {
    return await this.personRepository.createPerson(personInput);
  }

  async deletePerson(id: number): Promise<Boolean> {
    return await this.personRepository.deletePerson(id);
  }

  async getPerson(id: number): Promise<Person> {
    return await this.personRepository.getPerson(id);
  }

  async updatePerson(id: number, personInput: PersonInput): Promise<Person> {
    return await this.personRepository.updatePerson(id, personInput);
  }
}
