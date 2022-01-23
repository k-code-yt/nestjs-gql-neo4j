import { Module } from '@nestjs/common';
import { PersonResolver } from './person.resolver';

@Module({
  providers: [PersonResolver]
})
export class PersonModule {}
