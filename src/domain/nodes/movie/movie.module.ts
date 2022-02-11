import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';

@Module({
  providers: [MovieService]
})
export class MovieModule {}
