import { Injectable } from '@nestjs/common';
import { QueryRepository } from 'src/neo4j/query.repository';

@Injectable()
export class UserRepository {
  constructor(private readonly queryRepository: QueryRepository) {}

  async userGenreMovieCountRec(userName: string, limit: number) {
    return '';
  }
}
