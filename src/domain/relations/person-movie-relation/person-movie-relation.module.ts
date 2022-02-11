import { Module } from '@nestjs/common';
import { PersonMovieRelationService } from './person-movie-relation.service';

@Module({
  providers: [PersonMovieRelationService]
})
export class PersonMovieRelationModule {}
