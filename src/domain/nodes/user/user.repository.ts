import { Injectable } from '@nestjs/common';
import { node, relation } from 'cypher-query-builder';
import { QueryRepository } from 'src/neo4j/query.repository';
import { Entities, Relations } from 'src/schema/graphql';

@Injectable()
export class UserRepository {
  constructor(private readonly queryRepository: QueryRepository) {}

  async userGenreMovieCountRec(userName: string, limit: number) {
    return '';
  }
}
