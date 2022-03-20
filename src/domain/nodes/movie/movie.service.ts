import { Injectable } from '@nestjs/common';
import { MovieRepository } from './movie.repository';
@Injectable()
export class MovieService {
  constructor(private readonly movieRepository: MovieRepository) {}

  async movieRatingCountRec(movieName: string, limit = 10) {
    return await this.movieRepository.movieRatingCountRec(movieName, limit);
  }
}
