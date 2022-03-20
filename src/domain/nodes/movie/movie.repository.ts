import { Injectable } from '@nestjs/common';
import { greaterThan, node, relation } from 'cypher-query-builder';
import { QueryRepository } from 'src/neo4j/query.repository';
import { Entities, Relations } from 'src/schema/graphql';

@Injectable()
export class MovieRepository {
  constructor(private readonly queryRepository: QueryRepository) {}

  async movieRatingCountRec(movieName: string, limit: number) {
    const initRatedAlias = `init${Relations.RATED}`;
    const recRatedAlias = `rec${Relations.RATED}`;
    const recMovieAlias = `rec${Entities.Movie}`;

    const result = await this.queryRepository
      .initQuery()
      .match([
        node(Entities.Movie, Entities.Movie, { title: movieName }),
        relation('in', initRatedAlias, Relations.RATED),
        node(Entities.User, Entities.User),
        relation('out', recRatedAlias, Relations.RATED),
        node(recMovieAlias, Entities.Movie),
      ])
      .where({
        [`${initRatedAlias}.rating`]: greaterThan(4),
        [`${recRatedAlias}.rating`]: greaterThan(4),
      })
      .return(`${recMovieAlias}.title as title, COUNT(*) AS popularity`)
      .orderBy('popularity', 'DESC')
      .limit(limit)
      .run();

    return result;
  }
}
