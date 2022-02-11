
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class PersonInput {
    name?: Nullable<string>;
    age?: Nullable<number>;
}

export class Person {
    id: number;
    name: string;
    age?: Nullable<number>;
}

export abstract class IQuery {
    abstract helloWorld(): Nullable<string> | Promise<Nullable<string>>;

    abstract getPerson(id: number): Nullable<Person> | Promise<Nullable<Person>>;
}

export abstract class IMutation {
    abstract createPerson(personInput: PersonInput): Person | Promise<Person>;

    abstract updatePerson(id: number, personInput: PersonInput): Person | Promise<Person>;

    abstract deletePerson(id: number): boolean | Promise<boolean>;
}

type Nullable<T> = T | null;
