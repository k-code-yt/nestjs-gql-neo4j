import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriberEntity } from './subscriber.entity';
import { SubscriberRepository } from './subscriber.repository';
import { SubscriberResolver } from './subscriber.resolver';
import { SubscriberService } from './subscriber.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriberEntity])],
  providers: [SubscriberResolver, SubscriberService, SubscriberRepository],
  exports: [SubscriberRepository],
})
export class SubscriberModule {}
