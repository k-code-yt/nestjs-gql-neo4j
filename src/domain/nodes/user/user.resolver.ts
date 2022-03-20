import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query()
  async userGenreMovieCountRec(
    @Args('userName') userName: string,
    @Args('limit') limit = 10,
  ) {
    return await this.userService.userGenreMovieCountRec(userName, limit);
  }
}
