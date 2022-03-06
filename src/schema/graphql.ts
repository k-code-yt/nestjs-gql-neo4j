
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class PersonInput {
    name: string;
    title: string;
    age: number;
}

export class SubscriberInput {
    email: string;
}

export class Person {
    id: string;
    name: string;
    title: string;
    age: number;
}

export class Subscriber {
    id: string;
    email: string;
}

export abstract class IQuery {
    abstract getPerson(): Person | Promise<Person>;

    abstract getSubscriber(): Subscriber | Promise<Subscriber>;
}

export abstract class IMutation {
    abstract addPerson(person?: Nullable<PersonInput>): Person | Promise<Person>;

    abstract addSubscriber(person?: Nullable<SubscriberInput>): Subscriber | Promise<Subscriber>;
}

export abstract class ISubscription {
    abstract trackAnyChange(): Nullable<Person> | Promise<Nullable<Person>>;
}

type Nullable<T> = T | null;
