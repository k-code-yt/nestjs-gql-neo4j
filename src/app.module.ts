import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { AppResolver } from './app.resolver';
import { Neo4jModule } from './neo4j/neo4j.module';
import { MovieModule } from './domain/nodes/movie/movie.module';
import { PersonModule } from './domain/nodes/person/person.module';
import { PersonMovieRelationModule } from './domain/relations/person-movie-relation/person-movie-relation.module';
import { UserResolver } from './domain/nodes/user/user.resolver';
import { UserModule } from './domain/nodes/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    Neo4jModule.forRootAsync(),
    MovieModule,
    PersonModule,
    PersonMovieRelationModule,
    UserModule,
  ],
  controllers: [],
  providers: [AppResolver],
})
export class AppModule {}
