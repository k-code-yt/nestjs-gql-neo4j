import { DynamicModule, Module } from '@nestjs/common';
import { Neo4jConfig } from './neo4j-config.interface';
import { Neo4jService } from './neo4j.service';
import { createDriver } from './neo4j.utils';

export const NEO4J_DRIVER = 'NEO4J_DRIVER';
export const NEO4J_CONFIG = 'NEO4J_CONFIG';

@Module({})
export class Neo4jModule {
  static forRoot(config: Neo4jConfig): DynamicModule {
    return {
      module: Neo4jModule,
      global: true,
      providers: [
        {
          // Inject this value into a class @Inject(NEO4J_CONFIG)
          provide: NEO4J_CONFIG,
          useValue: config,
        },
        {
          // Define a key for injection
          provide: NEO4J_DRIVER,
          // Inject NEO4J_CONFIG defined above as the
          inject: [NEO4J_CONFIG],
          // Use the factory function created above to return the driver
          useFactory: async (config: Neo4jConfig) => createDriver(config),
        },
        Neo4jService,
      ],
    };
  }
}
