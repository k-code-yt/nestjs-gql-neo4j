
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum Entities {
    Person = "Person",
    Subscriber = "Subscriber"
}

export class PersonInput {
    name: string;
    title: string;
    age: number;
}

export class SubscriberInput {
    email: string;
}

export class Person {
    __typename?: 'Person';
    id: string;
    name: string;
    title: string;
    age: number;
}

export class Subscriber {
    __typename?: 'Subscriber';
    id: string;
    email: string;
}

export abstract class IQuery {
    __typename?: 'IQuery';

    abstract getPerson(): Person | Promise<Person>;

    abstract getSubscriber(): Subscriber | Promise<Subscriber>;
}

export abstract class IMutation {
    __typename?: 'IMutation';

    abstract addPerson(person: PersonInput): Person | Promise<Person>;

    abstract addSubscriber(subscriber: SubscriberInput): Subscriber | Promise<Subscriber>;

    abstract updatePerson(id: string, person: PersonInput): Person | Promise<Person>;

    abstract updateSubscriber(id: string, subscriber: SubscriberInput): Subscriber | Promise<Subscriber>;
}

export abstract class ISubscription {
    __typename?: 'ISubscription';

    abstract trackAnyChange(): TrackAnyChangeResult | Promise<TrackAnyChangeResult>;
}

export type TrackAnyChangeResult = Person | Subscriber;
type Nullable<T> = T | null;
