import { ResolveField, Resolver } from '@nestjs/graphql';
import { Entities, Person, TrackAnyChangeResult } from 'src/schema/graphql';

@Resolver('TrackAnyChangeResult')
export class TrackAnyChangeResultResolver {
  @ResolveField()
  __resolveType(value: TrackAnyChangeResult) {
    if (value.__typename === Entities.Person) {
      return Entities.Person;
    }

    if (value.__typename === Entities.Subscriber) {
      return Entities.Subscriber;
    }

    return null;
  }
}
