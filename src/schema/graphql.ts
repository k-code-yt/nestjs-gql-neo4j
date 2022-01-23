
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class PersonInput {
    id?: Nullable<number>;
    email?: Nullable<string>;
    name?: Nullable<string>;
}

export class Person {
    id?: Nullable<number>;
    email?: Nullable<string>;
    name?: Nullable<string>;
}

export abstract class IQuery {
    abstract helloWorld(): Nullable<string> | Promise<Nullable<string>>;

    abstract getPerson(): Nullable<Person> | Promise<Nullable<Person>>;
}

export abstract class IMutation {
    abstract addPerson(person?: Nullable<PersonInput>): Nullable<Person> | Promise<Nullable<Person>>;
}

export abstract class ISubscription {
    abstract newPerson(): Nullable<Person> | Promise<Nullable<Person>>;
}

type Nullable<T> = T | null;
