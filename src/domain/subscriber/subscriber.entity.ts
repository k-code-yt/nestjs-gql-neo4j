import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Subscriber } from 'src/schema/graphql';

@Entity()
export class SubscriberEntity implements Subscriber {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  email: string;
}
