import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async userGenreMovieCountRec(userName: string, limit = 10) {
    return await this.userRepository.userGenreMovieCountRec(userName, limit);
  }
}
