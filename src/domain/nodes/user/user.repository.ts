import { Injectable } from '@nestjs/common';
import { node, relation } from 'cypher-query-builder';
import { QueryRepository } from 'src/neo4j/query.repository';
import { Entities, Relations } from 'src/schema/graphql';

@Injectable()
export class UserRepository {
  constructor(private readonly queryRepository: QueryRepository) {}

  async userGenreMovieCountRec(userName: string, limit: number) {
    const result = await this.queryRepository
      .initQuery()
      .match([
        node(Entities.User, Entities.User, { name: userName }),
        relation('out', '', Relations.RATED),
        node(Entities.Movie, Entities.Movie),
        relation('in', '', Relations.ACTED_IN),
        node(Entities.Actor, Entities.Actor),
      ])
      .return(
        `${Entities.Movie}.title as title, COLLECT(${Entities.Actor}.name) as listOfActorNames`,
      )
      .orderBy('listOfActorNames', 'DESC')
      .limit(limit)
      .run();

    return '';
  }
}
