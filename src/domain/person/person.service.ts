import { Injectable } from '@nestjs/common';
import { PersonInput } from 'src/schema/graphql';
import { PersonRepository } from './person.repository';

@Injectable()
export class PersonService {
  constructor(private personRepository: PersonRepository) {}

  async addPerson(person: PersonInput) {
    return await this.personRepository.save(person);
  }
}
