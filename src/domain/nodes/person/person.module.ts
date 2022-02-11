import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonResolver } from './person.resolver';
import { PersonRepository } from './person.repository';

@Module({
  providers: [PersonService, PersonResolver, PersonRepository],
  exports: [PersonRepository],
})
export class PersonModule {}
