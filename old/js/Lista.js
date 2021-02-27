class ListNode {
    constructor(data) {
        this.data = data
        this.next = null          
    }
}

export default class List{
    constructor(data){
        this.head = new ListNode(data)
    }

    push(data){
        if(this.head === null)
            this.head = new ListNode(data)
        else{
            let current = this.head
            while(current.next !== null){
                current = current.next
            }

            current.next = new ListNode(data)
            return current.next
        }
    }

    pushArray(array){
        array.forEach(estado => {
            this.push(estado)
        });
    }

    delete(data){
      try {
            if(this.head.data === data){
                this.head = this.head.next
            }else{
                let previous = this.head
                let current = this.head.next
                while(current.data !== data){
                    previous = current
                    current = current.next
                }
                previous.next = current.next
            }
        } catch (error) {
            throw "Value does not match with any value on the list."
        }
    }

    get(data){
        try {
            if(this.head.data === data){
                return this.head
            }else{
                let current = this.head
                while(current.data !== data){
                    current = current.next
                }
                return current
            }
        } catch (error) {
            throw "Value does not match with any value on the list."
        }
    }

}

