import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonEntity } from './person.entity';
import { PersonRepository } from './person.repository';
import { PersonResolver } from './person.resolver';
import { PersonService } from './person.service';

@Module({
  imports: [TypeOrmModule.forFeature([PersonEntity])],
  providers: [PersonResolver, PersonService, PersonRepository],
  exports: [PersonRepository],
})
export class PersonModule {}
