import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query()
  helloWorld() {
    return 'Hello World!';
  }
}
