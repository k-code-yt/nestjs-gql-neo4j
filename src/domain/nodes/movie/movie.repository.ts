import { Injectable } from '@nestjs/common';
import { QueryRepository } from 'src/neo4j/query.repository';

@Injectable()
export class MovieRepository {
  constructor(private readonly queryRepository: QueryRepository) {}

  async movieRatingCountRec(movieName: string, limit: number) {
    return '';
  }
}
