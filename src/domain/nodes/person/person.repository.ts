import { Injectable } from '@nestjs/common';
import { QueryRepository } from 'src/neo4j/query.repository';
import { Person, PersonInput } from 'src/schema/graphql';

@Injectable()
export class PersonRepository {
  constructor(private readonly queryRepository: QueryRepository) {}

  async createPerson(personInput: PersonInput): Promise<Person> {
    const { name, age } = personInput;
    const query = await this.queryRepository
      .initQuery()
      .raw(
        `CREATE (person:Person {name: "${name}", age: "${age}"}) 
    RETURN person`,
      )
      .run();

    if (query?.length > 0) {
      const {
        person: { identity, properties },
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
      .raw(
        `MATCH (person:Person) 
    WHERE ID(person) = ${id}
    DELETE person`,
      )
      .run();

    return true;
  }

  async getPerson(id: number): Promise<Person> {
    const query = await this.queryRepository
      .initQuery()
      .raw(
        `MATCH (person:Person) 
      WHERE ID(person) = ${id}
      RETURN person`,
      )
      .run();

    if (query?.length > 0) {
      const {
        person: { identity, properties },
      } = query[0];
      return {
        id: identity,
        ...properties,
      };
    }
  }

  async updatePerson(id: number, personInput: PersonInput): Promise<Person> {
    const { name, age } = personInput;
    const query = await this.queryRepository
      .initQuery()
      .raw(
        `MATCH (person:Person) 
      WHERE ID(person) = ${id}
      SET person.name = "${name}", person.age = "${age}"
      RETURN person`,
      )
      .run();

    if (query?.length > 0) {
      const {
        person: { identity, properties },
      } = query[0];
      return {
        id: identity,
        ...properties,
      };
    }
  }
}
