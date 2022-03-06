import { Injectable } from '@nestjs/common';
import { SubscriberInput } from 'src/schema/graphql';
import { SubscriberRepository } from './subscriber.repository';

@Injectable()
export class SubscriberService {
  constructor(private subscriberRepository: SubscriberRepository) {}

  async addSubscriber(subscriber: SubscriberInput) {
    return await this.subscriberRepository.save(subscriber);
  }
}
