/** @license
 *  Copyright 2016 - present The Material Motion Authors. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not
 *  use this file except in compliance with the License. You may obtain a copy
 *  of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  License for the specific language governing permissions and limitations
 *  under the License.
 */

import $$observable from 'symbol-observable';

// We re-export everything we import, so dependents don't need to know about
// indefinite-observable.
import {
  Disconnect,
  NextChannel,
  Observable,
  Observer,
  Subscription,
} from 'indefinite-observable';

export {
  Disconnect,
  NextChannel,
  Observable,
  Observer,
  Subscription,
} from 'indefinite-observable';

import {
  MotionObservable,
  State,
} from './observables/MotionObservable';

export function isObservable(value:any): value is Observable<any> {
  // According to the spec, all Observables should have a `$$observable` method
  // that returns themselves:
  //
  // https://github.com/tc39/proposal-observable#observable
  //
  // A simpler (but less precise) test would just check for the existance of a
  // `subscribe` method and presume that anything that had one was an
  // Observable.
  return value[$$observable] !== undefined && value[$$observable]() === value;
}

export interface MotionObserver<T> extends Observer<T> {
  state:StateChannel;
}
export type StateChannel = (value: State) => void;
export type MotionObserverOrNext<T> = MotionObserver<T> | NextChannel<T>;

export type MotionConnect<T> = (observer: MotionObserver<T>) => Disconnect;
export type NextOperation<T, U> = (value: T, nextChannel: NextChannel<U>) => void;


export interface Subject<T> extends Observable<T> {
  next(T): void;
}

export type Point2D = {
  x: number,
  y: number,
};


export type Read<T> = () => T;
export interface ScopedReadable<T> {
  read: Read<T>;
}

export type Write<T> = (value: T) => void;
export interface ScopedWritable<T> {
  write: Write<T>;
}

export interface PropertyObservable<T> extends Observable<T>, ScopedReadable<T>, ScopedWritable<T> {}

export interface MotionElement {
  readonly scrollPosition: ScopedReadable<Point2D> & ScopedWritable<Point2D>;
  getEvent$(type: string): MotionObservable<Event>;
}

export type SpringArgs<T> = {
  destination: PropertyObservable<T>,

  /* When the destination changes, the spring will update its configuration from
   * the properties given below.
   *
   * The spring's current value and configuration are state that would normally
   * be managed by the spring itself.  However, an author may want to take
   * control of that state (for instance, to ensure that it is updated if
   * its affected externally, perhaps by a gesture).
   *
   * Therefore, we provide two ways for the spring to be configured:
   *
   *  - If we receive a raw primitive, we'll use it for the initial value and
   *    the spring will manage that state.
   *
   *  - If we receive a readable or stream, we'll presume the author is managing
   *    the value externally and check there for updates.
   */
  friction: PropertyObservable<number> | number,
  tension: PropertyObservable<number> | number,
  initialValue: ScopedReadable<T> | T,
  initialVelocity: ScopedReadable<T> | T,
  threshold: ScopedReadable<number> | number,
};

export type SpringSystem<T> = (kwargs: SpringArgs<T>) => MotionObservable<T>;

export type Dict<T> = {
  [index: string]: T,
};

export type StreamDict<T> = Dict<Observable<T>>;
export type SubjectDict<T> = Dict<Subject<T>>;
export type SubscriptionDict<T> = Dict<Subscription>;

