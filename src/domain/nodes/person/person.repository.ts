import { Injectable } from '@nestjs/common';
import { node } from 'cypher-query-builder';
import { QueryRepository } from 'src/neo4j/query.repository';
import { Entities, Person, PersonInput } from 'src/schema/graphql';

@Injectable()
export class PersonRepository {
  constructor(private readonly queryRepository: QueryRepository) {}

  async createPerson(personInput: PersonInput): Promise<Person> {
    const { name, age } = personInput;
    const query = await this.queryRepository
      .initQuery()
      .createNode(Entities.Person, Entities.Person, { name, age })
      .return(Entities.Person)
      .run();

    if (query?.length > 0) {
      const {
        [Entities.Person]: { identity, properties },
      } = query[0];
      return {
        id: identity,
        ...properties,
      };
    }
  }

  async deletePerson(id: number): Promise<Boolean> {
    await this.queryRepository
      .initQuery()
      .match([node(Entities.Person, Entities.Person)])
      .where({
        [`ID(${Entities.Person})`]: id,
      })
      .delete(Entities.Person)
      .run();

    return true;
  }

  async getPerson(id: number): Promise<Person> {
    const query = await this.queryRepository
      .initQuery()
      .match([node(Entities.Person, Entities.Person)])
      .where({
        [`ID(${Entities.Person})`]: id,
      })
      .return(Entities.Person)
      .run();

    if (query?.length > 0) {
      const {
        [Entities.Person]: { identity, properties },
      } = query[0];
      return {
        id: identity,
        ...properties,
      };
    }
  }

  async updatePerson(id: number, personInput: PersonInput): Promise<Person> {
    const { name, age } = personInput;
    let updateObject = {};
    if (name) {
      updateObject = {
        [`${Entities.Person}.name`]: name,
      };
    }

    if (age) {
      updateObject = {
        ...updateObject,
        [`${Entities.Person}.age`]: age,
      };
    }

    const query = await this.queryRepository
      .initQuery()
      .match([node(Entities.Person, Entities.Person)])
      .where({
        [`ID(${Entities.Person})`]: id,
      })
      .setValues(updateObject)
      .return(Entities.Person)
      .run();

    if (query?.length > 0) {
      const {
        [Entities.Person]: { identity, properties },
      } = query[0];
      return {
        id: identity,
        ...properties,
      };
    }
  }
}
