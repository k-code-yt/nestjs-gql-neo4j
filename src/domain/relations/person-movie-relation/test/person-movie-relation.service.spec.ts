import { Test, TestingModule } from '@nestjs/testing';
import { PersonMovieRelationService } from '../person-movie-relation.service';

describe('PersonMovieRelationService', () => {
  let service: PersonMovieRelationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonMovieRelationService],
    }).compile();

    service = module.get<PersonMovieRelationService>(
      PersonMovieRelationService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
