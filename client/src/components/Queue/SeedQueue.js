class Queue {
    constructor(values) {
        if(values !== undefined) {
            if(Array.isArray(values)) {
                this.items = JSON.parse(JSON.stringify(values));
            } else {
                this.items = [];
            }
        } else {
            this.items = []; 
        } 

        this.getType = function() {
            return "Queue";
        }
    }

    add(element) { 
        this.items.push(element); 
    }

    remove() { 
        if (this.items.length === 0) {
            throw "Empty Queue Exception"; 
        }
        return this.items.shift();
    } 

    peek() { 
        if (this.items.length === 0) {
            throw "Empty Queue Exception"; 
        }
        return this.items[0];
    } 

    isEmpty() {
        return this.items.length === 0;
    }

    toStirng() {
        let result = "";
        result += "{ Front [" + this.items.join(", ") + "] Back }";
        return result;
    }
}

module.exports = Queue;