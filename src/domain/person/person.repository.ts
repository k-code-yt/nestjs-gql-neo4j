import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonInput } from 'src/schema/graphql';
import { Repository } from 'typeorm';
import { PersonEntity } from './person.entity';

@Injectable()
export class PersonRepository {
  constructor(
    @InjectRepository(PersonEntity)
    private personRepository: Repository<PersonEntity>,
  ) {}

  async save(person: PersonInput) {
    const personInstance = this.personRepository.create(person);
    return await this.personRepository.save(personInstance);
  }
}
