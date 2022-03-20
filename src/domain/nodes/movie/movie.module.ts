import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieResolver } from './movie.resolver';
import { MovieRepository } from './movie.repository';

@Module({
  providers: [MovieService, MovieResolver, MovieRepository],
  exports: [MovieRepository],
})
export class MovieModule {}
