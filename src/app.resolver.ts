import { Query, Resolver } from '@nestjs/graphql';
import { Person } from './schema/graphql';

@Resolver()
export class AppResolver {
  @Query()
  helloWorld() {
    return 'Hello World!';
  }

  @Query()
  getPerson(): Person {
    console.log('debugger is stopped');

    console.log('debugger is running!');

    return {
      email: 'kos@gmail.com',
      name: 'kos',
      id: 12312,
    };
  }
}
