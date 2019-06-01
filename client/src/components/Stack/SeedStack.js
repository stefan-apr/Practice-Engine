class Stack {
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
            return "Stack";
        }
    }

    push(element) { 
        this.items.push(element); 
    }

    pop() { 
        if (this.items.length === 0) {
            throw "Empty Stack Exception"; 
        }
        return this.items.pop(); 
    } 

    peek() { 
        if (this.items.length === 0) {
            throw "Empty Stack Exception"; 
        }
        return this.items[this.items.length - 1];
    } 

    isEmpty() {
        return this.items.length === 0;
    }

    toStirng() {
        let result = "";
        result += "{ Bottom [" + this.items.join(", ") + "] Top }"
        return result;
    }
}

module.exports = Stack;