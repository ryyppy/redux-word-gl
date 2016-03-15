/**
 * This file provides type definitions for use with the Flow type checker.
 *
 * Immutable data encourages pure functions (data-in, data-out) and lends itself
 * to much simpler application development and enabling techniques from
 * functional programming such as lazy evaluation.
 *
 * While designed to bring these powerful functional concepts to JavaScript, it
 * presents an Object-Oriented API familiar to JavaScript engineers and closely
 * mirroring that of Array, Map, and Set. It is easy and efficient to convert to
 * and from plain JavaScript types.
 * Note: all examples are presented in [ES6][]. To run in all browsers, they
 * need to be translated to ES3. For example:
 *
 *     // ES6
 *     foo.map(x => x * x);
 *     // ES3
 *     foo.map(function (x) { return x * x; });
 *
 * [ES6]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla
 *
 * @flow
 */

/*
 * Alias for ECMAScript `Iterable` type, declared in
 * https://github.com/facebook/flow/blob/master/lib/core.js
 *
 * Note that Immutable values implement the `ESIterable` interface.
 */
type ESIterable<T> = $Iterable<T,void,void>;
type booleany = any;

declare class Iterable<K,V> {
  static Keyed:   Class<Object>;
  static Indexed: Class<Object>;
  static Set:     Class<Object>;

  static isIterable(maybeIterable: any): boolean;
  static isKeyed(maybeKeyed: any): boolean;
  static isIndexed(maybeIndexed: any): boolean;
  static isAssociative(maybeAssociative: any): boolean;
  static isOrdered(maybeOrdered: any): boolean;

  equals(other: Iterable<K,V>): boolean;
  hashCode(): number;
  get<V_>(key: K, notSetValue: V_): V|V_;
  get(key: K): ?V;
  has(key: K): boolean;
  includes(value: V): boolean;
  contains(value: V): boolean;
  first(): V;
  last(): V;

  getIn<T>(searchKeyPath: ESIterable<any>, notSetValue: T): T;
  getIn<T>(searchKeyPath: ESIterable<any>): ?T;
  hasIn(searchKeyPath: ESIterable<any>): boolean;

  toJS(): any;
  toArray(): V[];
  toObject(): { [key: string]: V };
  toMap(): Map<K,V>;
  toOrderedMap(): Map<K,V>;
  toSet(): Set<V>;
  toOrderedSet(): Set<V>;
  toList(): List<V>;
  toStack(): Stack<V>;
  toSeq(): Seq<K,V>;
  toKeyedSeq(): KeyedSeq<K,V>;
  toIndexedSeq(): IndexedSeq<V>;
  toSetSeq(): SetSeq<V>;

  keys(): Iterator<K>;
  values(): Iterator<V>;
  entries(): Iterator<[K,V]>;

  keySeq(): IndexedSeq<K>;
  valueSeq(): IndexedSeq<V>;
  entrySeq(): IndexedSeq<[K,V]>;

  filter(
    predicate: (value: V, key: K, iter: this) => booleany,
    context?: any
  ): this;

  filterNot(
    predicate: (value: V, key: K, iter: this) => booleany,
    context?: any
  ): this;

  reverse(): this;
  sort(comparator?: (valueA: V, valueB: V) => number): this;

  sortBy<C>(
    comparatorValueMapper: (value: V, key: K, iter: this) => C,
    comparator?: (valueA: C, valueB: C) => number
  ): this;

  groupBy<G>(
    grouper: (value: V, key: K, iter: this) => G,
    context?: any
  ): KeyedSeq<G, this>;

  forEach(
    sideEffect: (value: V, key: K, iter: this) => any,
    context?: any
  ): number;

  slice(begin?: number, end?: number): this;
  rest(): this;
  butLast(): this;
  skip(amount: number): this;
  skipLast(amount: number): this;
  skipWhile(predicate: (value: V, key: K, iter: this) => booleany, context?: any): this;
  skipUntil(predicate: (value: V, key: K, iter: this) => booleany, context?: any): this;
  take(amount: number): this;
  takeLast(amount: number): this;
  takeWhile(predicate: (value: V, key: K, iter: this) => booleany, context?: any): this;
  takeUntil(predicate: (value: V, key: K, iter: this) => booleany, context?: any): this;
  flatten(depth?: number): /*this*/Iterable<any,any>;
  flatten(shallow?: boolean): /*this*/Iterable<any,any>;

  reduce<R>(
    reducer: (reduction: R, value: V, key: K, iter: this) => R,
    initialReduction?: R,
    context?: any,
  ): R;

  reduceRight<R>(
    reducer: (reduction: R, value: V, key: K, iter: this) => R,
    initialReduction?: R,
    context?: any,
  ): R;

  every(predicate: (value: V, key: K, iter: this) => booleany, context?: any): boolean;
  some(predicate: (value: V, key: K, iter: this) => booleany, context?: any): boolean;
  join(separator?: string): string;
  isEmpty(): boolean;
  count(predicate?: (value: V, key: K, iter: this) => booleany, context?: any): number;
  countBy<G>(grouper: (value: V, key: K, iter: this) => G, context?: any): Map<G,number>;

  find<V_>(
    predicate: (value: V, key: K, iter: this) => booleany,
    context: any,
    notSetValue: V_
  ): V|V_;
  find<V_>(
    predicate: (value: V, key: K, iter: this) => booleany,
    context?: any,
  ): ?V;

  findLast<V_>(
    predicate: (value: V, key: K, iter: this) => booleany,
    context: any,
    notSetValue: V_
  ): V|V_;
  findLast<V_>(
    predicate: (value: V, key: K, iter: this) => booleany,
    context?: any,
  ): ?V;

  findEntry(predicate: (value: V, key: K, iter: this) => booleany): ?[K,V];
  findLastEntry(predicate: (value: V, key: K, iter: this) => booleany): ?[K,V];

  max(comparator?: (valueA: V, valueB: V) => number): V;
  maxBy<C>(
    comparatorValueMapper: (value: V, key: K, iter: this) => C,
    comparator?: (valueA: C, valueB: C) => number
  ): V;
  min(comparator?: (valueA: V, valueB: V) => number): V;
  minBy<C>(
    comparatorValueMapper: (value: V, key: K, iter: this) => C,
    comparator?: (valueA: C, valueB: C) => number
  ): V;

  isSubset(iter: Iterable<any, V>): boolean;
  isSubset(iter: ESIterable<V>): boolean;
  isSuperset(iter: Iterable<any, V>): boolean;
  isSuperset(iter: ESIterable<V>): boolean;
}

declare class KeyedIterable<K,V> extends Iterable<K,V> {
  static <K,V>(iter?: ESIterable<[K,V]>): KeyedIterable<K,V>;
  static <K,V>(obj?: { [key: K]: V }): KeyedIterable<K,V>;

  @@iterator(): Iterator<[K,V]>;
  toSeq(): KeyedSeq<K,V>;
  flip(): /*this*/KeyedIterable<V,K>;

  mapKeys<K_>(
    mapper: (key: K, value: V, iter: this) => K_,
    context?: any
  ): /*this*/KeyedIterable<K_,V>;

  mapEntries<K_,V_>(
    mapper: (entry: [K,V], index: number, iter: this) => [K_,V_],
    context?: any
  ): /*this*/KeyedIterable<K_,V_>;

  keyOf(searchValue: V): ?K;
  lastKeyOf(searchValue: V): ?K;
  findKey(predicate: (value: V, key: K, iter: this) => booleany, context?: any): ?K;
  findLastKey(predicate: (value: V, key: K, iter: this) => booleany, context?: any): ?K;

  concat(...iters: ESIterable<[K,V]>[]): this;

  map<V_>(
    mapper: (value: V, key: K, iter: this) => V_,
    context?: any
  ): /*this*/KeyedIterable<K,V_>;

  flatMap<K_, V_>(
    mapper: (value: V, key: K, iter: this) => ESIterable<[K_,V_]>,
    context?: any
  ): /*this*/KeyedIterable<K_,V_>;
}

declare class IndexedIterable<T> extends Iterable<number,T> {
  static <T>(iter?: ESIterable<T>): IndexedIterable<T>;

  @@iterator(): Iterator<T>;
  toSeq(): IndexedSeq<T>;
  fromEntrySeq<K,V>(): KeyedSeq<K,V>;
  interpose(separator: T): this;
  interleave(...iterables: ESIterable<T>[]): this;
  splice(
    index: number,
    removeNum: number,
    ...values: T[]
  ): this;

  zip<A>(
    a: ESIterable<A>,
    $?: null
  ): IndexedIterable<[T,A]>;
  zip<A,B>(
    a: ESIterable<A>,
    b: ESIterable<B>,
    $?: null
  ): IndexedIterable<[T,A,B]>;
  zip<A,B,C>(
    a: ESIterable<A>,
    b: ESIterable<B>,
    c: ESIterable<C>,
    $?: null
  ): IndexedIterable<[T,A,B,C]>;
  zip<A,B,C,D>(
    a: ESIterable<A>,
    b: ESIterable<B>,
    c: ESIterable<C>,
    d: ESIterable<D>,
    $?: null
  ): IndexedIterable<[T,A,B,C,D]>;
  zip<A,B,C,D,E>(
    a: ESIterable<A>,
    b: ESIterable<B>,
    c: ESIterable<C>,
    d: ESIterable<D>,
    e: ESIterable<E>,
    $?: null
  ): IndexedIterable<[T,A,B,C,D,E]>;

  zipWith<A,R>(
    zipper: (value: T, a: A) => R,
    a: ESIterable<A>,
    $?: null
  ): IndexedIterable<R>;
  zipWith<A,B,R>(
    zipper: (value: T, a: A, b: B) => R,
    a: ESIterable<A>,
    b: ESIterable<B>,
    $?: null
  ): IndexedIterable<R>;
  zipWith<A,B,C,R>(
    zipper: (value: T, a: A, b: B, c: C) => R,
    a: ESIterable<A>,
    b: ESIterable<B>,
    c: ESIterable<C>,
    $?: null
  ): IndexedIterable<R>;
  zipWith<A,B,C,D,R>(
    zipper: (value: T, a: A, b: B, c: C, d: D) => R,
    a: ESIterable<A>,
    b: ESIterable<B>,
    c: ESIterable<C>,
    d: ESIterable<D>,
    $?: null
  ): IndexedIterable<R>;
  zipWith<A,B,C,D,E,R>(
    zipper: (value: T, a: A, b: B, c: C, d: D, e: E) => R,
    a: ESIterable<A>,
    b: ESIterable<B>,
    c: ESIterable<C>,
    d: ESIterable<D>,
    e: ESIterable<E>,
    $?: null
  ): IndexedIterable<R>;

  indexOf(searchValue: T): number;
  lastIndexOf(searchValue: T): number;
  findIndex(
    predicate: (value: T, index: number, iter: this) => booleany,
    context?: any
  ): number;
  findLastIndex(
    predicate: (value: T, index: number, iter: this) => booleany,
    context?: any
  ): number;

  concat(...iters: ESIterable<T>[]): this;

  map<U>(
    mapper: (value: T, index: number, iter: this) => U,
    context?: any
  ): /*this*/IndexedIterable<U>;

  flatMap<U>(
    mapper: (value: T, index: number, iter: this) => ESIterable<U>,
    context?: any
  ): /*this*/IndexedIterable<U>;
}

declare class SetIterable<T> extends Iterable<T,T> {
  static <T>(iter?: ESIterable<T>): SetIterable<T>;

  @@iterator(): Iterator<T>;
  toSeq(): SetSeq<T>;

  concat(...iters: ESIterable<T>[]): this;

  // `map` and `flatMap` cannot be defined further up the hiearchy, because the
  // implementation for `KeyedIterable` allows the value type to change without
  // constraining the key type. That does not work for `SetIterable` - the value
  // and key types *must* match.
  map<U>(
    mapper: (value: T, value: T, iter: this) => U,
    context?: any
  ): /*this*/SetIterable<U>;

  flatMap<U>(
    mapper: (value: T, value: T, iter: this) => ESIterable<U>,
    context?: any
  ): /*this*/SetIterable<U>;
}

declare class Collection<K,V> extends Iterable<K,V> {
  static Keyed:   Class<Object>;
  static Indexed: Class<Object>;
  static Set:     Class<Object>;

  size: number;
}

declare class KeyedCollection<K,V> extends Collection<K,V> mixins KeyedIterable<K,V> {
  toSeq(): KeyedSeq<K,V>;
}

declare class IndexedCollection<T> extends Collection<number,T> mixins IndexedIterable<T> {
  toSeq(): IndexedSeq<T>;
}

declare class SetCollection<T> extends Collection<T,T> mixins SetIterable<T> {
  toSeq(): SetSeq<T>;
}

declare class Seq<K,V> extends Iterable<K,V> {
  static Keyed:   Class<Object>;
  static Indexed: Class<Object>;
  static Set:     Class<Object>;

  static <K,V>(iter: KeyedSeq<K,V>):   KeyedSeq<K,V>;
  static <T>  (iter: SetSeq<T>):       SetSeq<K,V>;
  static <T>  (iter?: ESIterable<T>):  IndexedSeq<T>;
  static <K,V>(iter: { [key: K]: V }): KeyedSeq<K,V>;

  static isSeq(maybeSeq: any): boolean;
  static of<T>(...values: T[]): IndexedSeq<T>;

  size: ?number;
  cacheResult(): this;
  toSeq(): this;
}

declare class KeyedSeq<K,V> extends Seq<K,V> mixins KeyedIterable<K,V> {
  static <K,V>(iter?: ESIterable<[K,V]>): KeyedSeq<K,V>;
  static <K,V>(iter?: { [key: K]: V }): KeyedSeq<K,V>;
}

declare class IndexedSeq<T> extends Seq<number,T> mixins IndexedIterable<T> {
  static <T>(iter?: ESIterable<T>): IndexedSeq<T>;
  static of<T>(...values: T[]): IndexedSeq<T>;
}

declare class SetSeq<T> extends Seq<T,T> mixins SetIterable<T> {
  static <T>(iter?: ESIterable<T>): IndexedSeq<T>;
  static of<T>(...values: T[]): SetSeq<T>;
}

declare class List<T> extends IndexedCollection<T> {
  static <T>(iterable?: ESIterable<T>): List<T>;

  static isList(maybeList: any): boolean;
  static of<T>(...values: T[]): List<T>;

  set<U>(index: number, value: U): List<T|U>;
  delete(index: number): this;
  remove(index: number): this;
  insert<U>(index: number, value: U): List<T|U>;
  clear(): this;
  push<U>(...values: U[]): List<T|U>;
  pop(): this;
  unshift<U>(...values: U[]): List<T|U>;
  shift(): this;

  update<U>(updater: (value: this) => List<U>): List<U>;
  update<U>(index: number, updater: (value: T) => U): List<T|U>;
  update<U>(index: number, notSetValue: U, updater: (value: T) => U): List<T|U>;

  merge<U>(...iterables: ESIterable<U>[]): List<T|U>;

  mergeWith<U,V>(
    merger: (previous: T, next: U, key: number) => V,
    ...iterables: ESIterable<U>[]
  ): List<T|U|V>;

  mergeDeep<U>(...iterables: ESIterable<U>[]): List<T|U>;

  mergeDeepWith<U,V>(
    merger: (previous: T, next: U, key: number) => V,
    ...iterables: ESIterable<U>[]
  ): List<T|U|V>;

  setSize(size: number): List<?T>;
  setIn(keyPath: ESIterable<any>, value: any): List<T>;
  deleteIn(keyPath: ESIterable<any>, value: any): this;
  removeIn(keyPath: ESIterable<any>, value: any): this;

  updateIn(keyPath: ESIterable<any>, notSetValue: any, value: any): List<T>;
  updateIn(keyPath: ESIterable<any>, value: any): List<T>;

  mergeIn(keyPath: ESIterable<any>, ...iterables: ESIterable<any>[]): List<T>;
  mergeDeepIn(keyPath: ESIterable<any>, ...iterables: ESIterable<any>[]): List<T>;

  withMutations(mutator: (mutable: this) => any): this;
  asMutable(): this;
  asImmutable(): this;

  // Overrides that specialize return types

  map<M>(
    mapper: (value: T, index: number, iter: this) => M,
    context?: any
  ): List<M>;

  flatMap<M>(
    mapper: (value: T, index: number, iter: this) => ESIterable<M>,
    context?: any
  ): List<M>;
}

declare class Map<K,V> extends KeyedCollection<K,V> {
  static <V>(obj?: {[key: string]: V}): Map<string, V>;
  static <K, V>(iterable?: ESIterable<[K,V]>): Map<K, V>;

  static isMap(maybeMap: any): boolean;

  set<K_,V_>(key: K_, value: V_): Map<K|K_,V|V_>;
  delete(key: K): this;
  remove(key: K): this;
  clear(): this;

  update<K_,V_>(updater: (value: this) => Map<K_,V_>): Map<K_,V_>;
  update<V_>(key: K, updater: (value: V) => V_): Map<K,V|V_>;
  update<V_>(key: K, notSetValue: V_, updater: (value: V) => V_): Map<K,V|V_>;

  merge<K_,V_>(
    ...iterables: (ESIterable<[K_,V_]> | { [key: K_]: V_ })[]
  ): Map<K|K_,V|V_>;

  mergeWith<K_,W,X>(
    merger: (previous: V, next: W, key: number) => X,
    ...iterables: ESIterable<W>[]
  ): Map<K,V|W|X>;

  mergeDeep<K_,V_>(
    ...iterables: (ESIterable<[K_,V_]> | { [key: K_]: V_ })[]
  ): Map<K|K_,V|V_>;

  mergeDeepWith<K_,W,X>(
    merger: (previous: V, next: W, key: number) => X,
    ...iterables: ESIterable<W>[]
  ): Map<K,V|W|X>;

  setIn(keyPath: ESIterable<any>, value: any): Map<K,V>;
  deleteIn(keyPath: ESIterable<any>, value: any): this;
  removeIn(keyPath: ESIterable<any>, value: any): this;

  updateIn(keyPath: ESIterable<any>, notSetValue: any, value: any): Map<K,V>;
  updateIn(keyPath: ESIterable<any>, value: any): Map<K,V>;

  mergeIn(keyPath: ESIterable<any>, ...iterables: ESIterable<any>[]): Map<K,V>;
  mergeDeepIn(keyPath: ESIterable<any>, ...iterables: ESIterable<any>[]): Map<K,V>;

  withMutations(mutator: (mutable: this) => any): this;
  asMutable(): this;
  asImmutable(): this;

  // Overrides that specialize return types

  map<V_>(
    mapper: (value: V, key: K, iter: this) => V_,
    context?: any
  ): Map<K,V_>;

  flatMap<K_,V_>(
    mapper: (value: V, key: K, iter: this) => ESIterable<[K_,V_]>,
    context?: any
  ): Map<K_,V_>;

  flip(): Map<V,K>;

  mapKeys<K_>(
    mapper: (key: K, value: V, iter: this) => K_,
    context?: any
  ): Map<K_,V>;
}

declare class OrderedMap<K,V> extends Map<K,V> {
  // TODO: can we just use the inherited constructor?
}

declare class Set<T> extends SetCollection<T> {
  static <T>(iterable?: ESIterable<T>): Set<T>;

  static isSet(maybeSet: any): boolean;
  static of<T>(...values: T[]): Set<T>;
  static fromKeys<T>(iter: ESIterable<[T,any]>): Set<T>;
  static fromKeys(iter: { [key: string]: any }): Set<string>;

  add<U>(value: U): Set<T|U>;
  delete(value: T): this;
  remove(value: T): this;
  clear(): this;
  union<U>(...iterables: ESIterable<U>[]): Set<T|U>;
  merge<U>(...iterables: ESIterable<U>[]): Set<T|U>;
  intersect<U>(...iterables: ESIterable<U>[]): Set<T&U>;
  subtract<U>(...iterables: ESIterable<U>[]): Set<T>;

  withMutations(mutator: (mutable: this) => any): this;
  asMutable(): this;
  asImmutable(): this;

  // Overrides that specialize return types

  map<M>(
    mapper: (value: T, value: T, iter: this) => M,
    context?: any
  ): Set<M>;

  flatMap<M>(
    mapper: (value: T, value: T, iter: this) => ESIterable<M>,
    context?: any
  ): Set<M>;
}

declare class OrderedSet<T> extends Set<T> {}

declare class Stack<T> extends IndexedCollection<T> {
  static <T>(iterable?: ESIterable<T>): Stack<T>;

  static isStack(maybeStack: any): boolean;
  static of<T>(...values: T[]): Stack<T>;

  peek(): T;
  clear(): this;
  unshift<U>(...values: U[]): Stack<T|U>;
  unshiftAll<U>(iter: ESIterable<U>): Stack<T|U>;
  shift(): this;
  push<U>(...values: U[]): Stack<T|U>;
  pushAll<U>(iter: ESIterable<U>): Stack<T|U>;
  pop(): this;

  withMutations(mutator: (mutable: this) => any): this;
  asMutable(): this;
  asImmutable(): this;

  // Overrides that specialize return types

  map<U>(
    mapper: (value: T, index: number, iter: this) => U,
    context?: any
  ): Stack<U>;

  flatMap<U>(
    mapper: (value: T, index: number, iter: this) => ESIterable<U>,
    context?: any
  ): Stack<U>;
}

declare function Range(start?: number, end?: number, step?: number): IndexedSeq<number>;
declare function Repeat<T>(value: T, times?: number): IndexedSeq<T>;

declare class Record<T:Object> {
  static <T:Object>(spec: T, name?: string): (values: $Shape<T>) => (T & Record<T>);
  get<A>(key: $Keys<T>): A;
  set<A>(key: $Keys<T>, value: A): T & Record<T>;
  remove(key: $Keys<T>): T & Record<T>;
}

declare function fromJS(json: Object, reviver?: (k: any, v: Iterable<any,any>) => any): any;
declare function is(first: any, second: any): boolean;

export {
  Iterable,
  Collection,
  Seq,

  // These classes do not actually exist under these names. But it is useful to
  // have the types available.
  KeyedIterable,
  IndexedIterable,
  SetIterable,
  KeyedCollection,
  IndexedCollection,
  SetCollection,
  KeyedSeq,
  IndexedSeq,
  SetSeq,

  List,
  Map,
  OrderedMap,
  OrderedSet,
  Range,
  Repeat,
  Record,
  Set,
  Stack,

  fromJS,
  is,
}