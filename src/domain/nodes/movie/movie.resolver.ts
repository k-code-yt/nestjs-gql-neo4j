import { Resolver, Query, Args } from '@nestjs/graphql';
import { MovieService } from './movie.service';

@Resolver()
export class MovieResolver {
  constructor(private readonly movieService: MovieService) {}

  @Query()
  async movieRatingCountRec(
    @Args('movieName') movieName: string,
    @Args('limit') limit = 10,
  ) {
    return await this.movieService.movieRatingCountRec(movieName, limit);
  }
}
