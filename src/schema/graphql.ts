
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum Entities {
    Actor = "Actor",
    Director = "Director",
    Genre = "Genre",
    Movie = "Movie",
    Person = "Person",
    User = "User"
}

export enum Relations {
    ACTED_IN = "ACTED_IN",
    DIRECTED = "DIRECTED",
    IN_GENRE = "IN_GENRE",
    RATED = "RATED"
}

export class PersonInput {
    name?: Nullable<string>;
    age?: Nullable<number>;
}

export class Person {
    id: number;
    name: string;
    age?: Nullable<number>;
}

export class UserGenreMovieCountRecResult {
    genreName: string;
    movieCount: number;
}

export class MovieRatingCountRecResult {
    title: string;
    popularity: number;
}

export abstract class IQuery {
    abstract helloWorld(): Nullable<string> | Promise<Nullable<string>>;

    abstract getPerson(id: number): Nullable<Person> | Promise<Nullable<Person>>;

    abstract movieRatingCountRec(movieName: string, limit?: Nullable<number>): Nullable<Nullable<MovieRatingCountRecResult>[]> | Promise<Nullable<Nullable<MovieRatingCountRecResult>[]>>;

    abstract userGenreMovieCountRec(userName: string, limit?: Nullable<number>): Nullable<Nullable<UserGenreMovieCountRecResult>[]> | Promise<Nullable<Nullable<UserGenreMovieCountRecResult>[]>>;
}

export abstract class IMutation {
    abstract createPerson(personInput: PersonInput): Person | Promise<Person>;

    abstract deletePerson(id: number): boolean | Promise<boolean>;

    abstract updatePerson(id: number, personInput: PersonInput): Person | Promise<Person>;
}

type Nullable<T> = T | null;
