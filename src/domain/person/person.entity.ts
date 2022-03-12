import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Person } from 'src/schema/graphql';

@Entity('person')
export class PersonEntity implements Person {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  age: number;
}
