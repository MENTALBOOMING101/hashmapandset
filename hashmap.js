import { LinkedList } from "./linkedlist.js";
export class HashMap {
  #loadFactor;
  #capacity;
  #buckets;
  #nodeLimit;
  constructor() {
    this.#loadFactor = 0.75;
    this.#capacity = 16;
    this.#nodeLimit = this.#capacity * this.#loadFactor;
    this.#buckets = new Array(this.#capacity);

    for (let i = 0; i < this.#buckets.length; i++) {
      this.#buckets[i] = new LinkedList();
    }
  }
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode;
  }
  set(key, value) {
    let hashCode = this.hash(key);
    if (
      this.#buckets[hashCode % this.#capacity].length() + 1 >=
      this.#nodeLimit
    ) {
      this.growth();
      this.#buckets[hashCode % this.#capacity].set(hashCode, value);
    } else this.#buckets[hashCode % this.#capacity].set(hashCode, value);
  }
  get(key) {
    let hashCode = this.hash(key);
    let value = this.#buckets[hashCode % this.#capacity].get(hashCode);

    if (value === null) return null;
    else return value;
  }
  has(key) {
    let hashCode = this.hash(key);
    let value = this.#buckets[hashCode % this.#capacity].get(hashCode);

    if (value === null) return false;
    else return true;
  }

  remove(key) {
    let hashCode = this.hash(key);
    if (this.#buckets[hashCode % this.#capacity].remove(hashCode)) return true;
    else return false;
  }

  length() {
    let summation = 0;
    for (let bucket of this.#buckets) {
      summation += bucket.length();
    }

    return summation;
  }
  clear() {
    for (let bucket of this.#buckets) bucket.clear();
  }
  keys() {
    let arrayOfKeys = [];
    for (let bucket of this.#buckets)
      arrayOfKeys = arrayOfKeys.concat(bucket.keys());

    return arrayOfKeys;
  }

  values() {
    let arrayOfValues = [];
    for (let bucket of this.#buckets)
      arrayOfValues = arrayOfValues.concat(bucket.values());

    return arrayOfValues;
  }
  entries() {
    let arrayOfEntries = [];
    for (let bucket of this.#buckets)
      arrayOfEntries = arrayOfEntries.concat(bucket.entries());
    return arrayOfEntries;
  }
  growth() {
    let arrayOfEntries = this.entries();
    this.#capacity *= 2;
    this.#nodeLimit = this.#capacity * this.#loadFactor;
    this.#buckets = new Array(this.#capacity);

    for (let i = 0; i < this.#buckets.length; i++) {
      this.#buckets[i] = new LinkedList();
    }

    for (let entry of arrayOfEntries) {
      this.#buckets[entry[0] % this.#capacity].set(entry[0], entry[1]);
    }
  }
}
