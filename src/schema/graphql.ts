
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class PersonInput {
    name?: Nullable<string>;
}

export class SubscriberInput {
    email?: Nullable<string>;
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
    abstract helloWorld(): Nullable<string> | Promise<Nullable<string>>;

    abstract getPerson(): Person | Promise<Person>;

    abstract getSubscriber(): Subscriber | Promise<Subscriber>;
}

export abstract class IMutation {
    abstract addPerson(person?: Nullable<PersonInput>): Person | Promise<Person>;

    abstract addSubscriber(person?: Nullable<SubscriberInput>): Subscriber | Promise<Subscriber>;
}

export abstract class ISubscription {
    abstract trackAnyChange(id?: Nullable<number>): Nullable<Person> | Promise<Nullable<Person>>;

    abstract something(): Nullable<Subscriber> | Promise<Nullable<Subscriber>>;
}

type Nullable<T> = T | null;
