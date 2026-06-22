import { LinkedList } from "./linkedlistset.js"
export class HashSet{
    #loadFactor
    #capacity
    #buckets
    #nodeLimit
    constructor() {
        this.#loadFactor = 0.75
        this.#capacity = 16
        this.#nodeLimit = this.#capacity * this.#loadFactor
        this.#buckets = new Array(this.#capacity)

        for (let i = 0; i < this.#buckets.length; i++) {
            this.#buckets[i] = new LinkedList()
        }

    }
    hash(key) {
        let hashCode = 0

        const primeNumber = 31

        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i)
        }
        return hashCode
    }
    set(key) {
        let hashCode = this.hash(key)
        if (this.#buckets[hashCode % this.#capacity].length() + 1 >= this.#nodeLimit) {
            this.growth()
            this.#buckets[hashCode % this.#capacity].set(hashCode)
        }
        else
            this.#buckets[hashCode % this.#capacity].set(hashCode)
    }
    get(key) {
        let hashCode = this.hash(key)
        let value = this.#buckets[hashCode % this.#capacity].get(hashCode)

        if (value === null)
            return null
        else
            return value
    }
    has(key) {
        let hashCode = this.hash(key)
        let value = this.#buckets[hashCode % this.#capacity].get(hashCode)

        if (value === null)
            return false
        else
            return true
    }

    remove(key) {
        let hashCode = this.hash(key)
        if (this.#buckets[hashCode % this.#capacity].remove(hashCode))
            return true
        else
            return false
    }

    length() {
        let summation = 0
        for (let bucket of this.#buckets) {
            summation += bucket.length()
        }

        return summation
    }
    clear() {
        for (let bucket of this.#buckets)
            bucket.clear()

    }
    keys() {
        let arrayOfKeys = []
        for (let bucket of this.#buckets)
            arrayOfKeys=arrayOfKeys.concat(bucket.keys())

        return arrayOfKeys
    }

    growth() {
        let arrayOfEntries = this.keys()
        this.#capacity *= 2
        this.#nodeLimit = this.#capacity * this.#loadFactor
        this.#buckets = new Array(this.#capacity)

        for (let i = 0; i < this.#buckets.length; i++) {
            this.#buckets[i] = new LinkedList()
        }

        for (let entry of arrayOfEntries) {
            this.#buckets[entry % this.#capacity].set(entry)
        }
    }
}


