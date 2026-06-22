export class LinkedList {
    #size;
    #head;
    #tail;
    constructor() {
        this.#size = 0
        this.#head = null;
        this.#tail = null;
    }
    set(key) {
        let curr = this.#head
        while (curr != null) {
            if (curr.key == key)
                break
            curr = curr.next
        }
        if (curr != null);
        
        else
            this.append(key)
    }
    append(key) {

        if (this.#head == null) {
            this.#head = new Node();
            this.#head.key = key;
            this.#tail = this.#head;

        } else {
            this.#tail.next = new Node();
            this.#tail = this.#tail.next;
            this.#tail.key = key;
        }
        this.#size++
    }
    get(key) {
        let curr = this.#head
        while (curr != null) {
            if (curr.key == key)
                return curr.key
            curr = curr.next
        }
        return null
    }
    has(key) {
        let curr = this.#head
        while (curr != null) {
            if (curr.key == key)
                return true

            curr = curr.next
        }
        return false
    }
    remove(key) {
        let curr = this.#head
        let prev = null
        while (curr != null) {
            if (curr.key == key)
                break
            prev = curr
            curr = curr.next
        }
        if (curr != null) {
            if(prev==null)
                this.#head=curr.next
            else
                prev.next = curr.next
            this.#size--
            return true
        }
        else
            return false
    }
    length() {
        return this.#size
    }
    clear() {
        this.#head = null
        this.#tail = null
    }
    keys() {
        let curr = this.#head
        let arr = []
        while (curr != null) {
            arr.push(curr.key)
            curr = curr.next
        }
        return arr
    }


}
class Node {
    constructor() {
        this.key = null;
        this.next = null;
    }
}
