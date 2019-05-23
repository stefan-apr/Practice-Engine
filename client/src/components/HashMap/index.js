// Exporting the HashMap component from this file

class HashMap {
    constructor() {
        this.list = [];
    }

    get(x) {
        let i = String.prototype.hashCode(x);
        if (!this.list[i]) {
            return undefined;  
        }
        let result;
        this.list[i].forEach(pairs => {
            if (pairs[0] === x) {
                result = pairs[1];
            }
        });
        return result;
    }

    put(x, y) {
        let i = String.prototype.hashCode(x);

        if (!this.list[i]) {
            this.list[i] = [];
        }
        this.list[i].push([x, y]);
    }

    /*
    each = function(callback) {
        for (let i = 0; i < this.list[0].length; i++) {
            callback(this.list[0][i], i, this.list[0]);
        }
    };

    eachValue = function(callback) {
        for (let i = 0; i < this.list[0].length; i++) {
            callback(this.list[0][i][1], i, this.list);
        }
    };

    eachKey = function(callback) {
        for (let i = 0; i < this.list[0].length; i++) {
            callback(this.list[0][i][0], i, this.list);
        }
    };

    keySet() {
        let keyset = [];
        for(let i = 0; i < this.list[0].length; i++) {
            keyset.push(this.list[0][i][0]);
        }
        return keyset;
    }
    */
}

// eslint-disable-next-line
String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

export default HashMap;