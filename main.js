class Deque {
    constructor() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }

    addFront(element) { 
        if (this.isEmpty()) {
            this.addBack(element); 
        } else {
            if (this.lowestCount > 0) { 
                this.lowestCount--;
                this.items[this.lowestCount] = element;
            } else {
                for (let i = this.count; i > 0; i--) {
                    this.items[i] = this.items[i - 1];
                }
                this.count++;
                this.lowestCount = 0;
                this.items[0] = element;
            }
        } 
    }

    addBack(element) {
        this.items[this.count] = element;
        this.count++;
    }

    removeFront() {
        if (this.isEmpty()) {
            return undefined;
        }

        const result = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        this.count--;
        return result;
    }

    removeBack() {
        if (this.isEmpty()) {
            return undefined;
        }

        const result = this.items[this.count - 1];
        delete this.items[this.count - 1];
        this.count--;
        return result;
    }

    peekFront() {
        if (this.isEmpty()) {
            return undefined;
        }

        return this.items[this.lowestCount];
    }

    peekBack() {
        if (this.isEmpty()) {
            return undefined;
        }

        return this.items[this.count - 1];
    }

    clear() {
        this.items = {};
        this.count = 0;
        this.lowestCount = 0;
    }

    size() { 
        return this.count - this.lowestCount;
    }

    isEmpty() {  
        return this.size() === 0;
    }

    toString() { 
        if (this.isEmpty()) {
            return '';
        }
        let objString = `${this.items[this.lowestCount]}`;
        for (let i = this.lowestCount + 1; i < this.count; i++) {
            objString = `${objString},${this.items[i]}`;
        }
        return objString;
    }
}

function hotPotato(elementsList, num) {
    const deque = new Deque();
    const eliminatedList = [];

    for (let i = 0; i < elementsList.length; i++) {
        deque.addBack(elementsList[i]);
    }

    while (deque.size() > 1) {
        for (let i = 0; i < num; i++) {
            deque.addBack(deque.removeFront()); 
        }
        eliminatedList.push(deque.removeFront());
    }

    return {
        eliminated: eliminatedList,
        winner: deque.removeFront()
    };
}

function voltas(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const nomes = ['Leonardo', 'Arthur', 'Meri', 'Verônica', 'Carlos', 'André'];
const numVoltas = voltas(2, 20); 
const result = hotPotato(nomes, numVoltas);

result.eliminated.forEach(name => {
    console.log(`${name} was eliminated from the Hot Potato game.`);
});

console.log(`The winner is: ${result.winner}`);
