import { Global, Module } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { PubSub } from 'graphql-subscriptions';
import { PubsubResolver } from './pubsub.resolver';
import { PubSubService } from './pubsub.service';

export const PUB_SUB = 'PUB_SUB';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: PUB_SUB,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const env = configService.get<string>('NODE_ENV');
        if (env === 'test') {
          return new PubSub();
        }
        return new RedisPubSub({
          connection: {
            host: configService.get<string>('REDIS_HOST'),
            port: configService.get<string>('REDIS_PORT'),
          },
        });
      },
    },
    PubsubResolver,
    PubSubService,
  ],
  exports: [PUB_SUB],
})
export class PubsubModule {}
