import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriberInput } from 'src/schema/graphql';
import { Repository } from 'typeorm';
import { SubscriberEntity } from './subscriber.entity';

@Injectable()
export class SubscriberRepository {
  constructor(
    @InjectRepository(SubscriberEntity)
    private subscriberRepository: Repository<SubscriberEntity>,
  ) {}

  async save(subscriber: SubscriberInput) {
    const subscriberInstance = this.subscriberRepository.create(subscriber);
    return await this.subscriberRepository.save(subscriberInstance);
  }
}
