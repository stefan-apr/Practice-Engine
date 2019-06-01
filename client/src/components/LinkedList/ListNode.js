class ListNode {
    constructor(data, other) {
        if(data !== undefined) {
            this.data = data;
        } else {
            this.data = 0;
        }
        if(other !== undefined) {
            this.next = other;
        } else {
            this.next = null;
        }
        this.getType = function() {
            return "Linked List";
        }
    }

    hasNext() {
        return this.next !== null;
    }

    toString() {
        let result = "";
        let itr = this;
        while(itr.hasNext()) {
            result += itr.data;
            result += " ⇒ ";
            itr = itr.next;
        }
        result += itr.data;
        return result;
    }   
}

export default ListNode;