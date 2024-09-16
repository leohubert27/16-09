
    // A fila dupla ou Deque permite inserir e retirar elementos 
    // tanto da frente, como do fim da fila. Precisamos ver, dar 
    // uma espiada nos elementos que estiverem tanto na frente 
    // como no fim da fila.
    // Resumindo, tudo o que precisamos é:
    //  - Adicionar elementos à frente da fila,
    //  - Retirar elementos da frente da fila,
    //  - Adicionar elementos no fim da fila,
    //  - Retirar elementos do fim da fila,
    //  - Ver o elemento que está à frente da fila,
    //  - Ver o elemento que está no fim da fila.
    // Além disso, vamos precisar dos métodos auxiliares:
    // isEmpty(), clear(), size() e toString(); assim como nós vimos usando
    // para as outras classes já estudadas: Queue e Stack.

class Deque{
    constructor(){ // Assim como na classe Queue().
        this.count=0; // Apontador para o fim da fila.
        this.lowestCount = 0; // Apontador para o início da fila.
        this.items = {}; // Um dado do tipo objeto indefinido ainda. 
        // Este tipo de dado {}, já vem pré-definido em JavaScript.
        // Objetos em JavaScript são pares ordenados indice,dado.
        // Assim como os vetores o são, mas aqui não é um vetor.
        // Podemos armazenar qualquer tipo de dados dentro de um
        // Objeto deste tipo.
    }


    // Somente neste método é que precisamos fazer diferente da classe Queue(). 
    addFront(element){ 
        if(this.isEmpty()){
            this.addBack(element); // O mesmo que faz o método enqueue(), da classe Queue().
        } 
        else{
            if(this.lowestCount > 0){ 
                this.lowestCount--;
                this.items[this.lowestCount] = element;
            }
            else{
                for(let i=this.count; i>0; i--){
                    this.items[i-1] = this.items[i];
                }
                count++;
                this.lowestCount = 0;
                this.items[0] = element;
            }
        } 
    }

    addBack(element){ // O mesmo que faz o método enqueue(), da classe Queue().
        this.items[this.count] = element;
        this.count++;
    }

    removeFront(){ // O mesmo que faz o método dequeue(), da classe Queue().
        if(this.isEmpty()){
            return undefined;
        }
        // Salva o primeiro elemento da fila, pois será removido.
        const result = this.items[this.lowestCount]; 
        delete this.items[this.lowestCount]; // Removi o primeiro elemento da fila.
        this.lowestCount++; // Este índice não existe mais, pois foi removido.
        return result;
    }

    removeBack(){ // O mesmo que faz o método pop(), da classe Stack().
        if(this.isEmpty()){
            return undefined;
        }
        // salva o último elemento da fila, pois será removido.
        const result = this.items[this.count-1];
        delete this.items[this.count-1];
        this.count--;
        return result;
    }

    // Dando uma espiada no primeiro elemento da fila.
    peekFront(){ // O mesmo que faz o método peek(), da classe Queue().
        if(this.isEmpty()){
            return undefined;
        }
        return this.items[this.lowestCount];
    }

    peekBack(){ // O mesmo que faz o método peek(), da classe Stack().
        if(this.isEmpty()){
            return undefined;
        }
        return this.items[this.count-1];
    }

    clear(){ // Assim como na classe Queue().
        this.items = {};
        this.count = 0;
        this;lowestCount = 0;
    }

    size(){ // Assim como na classe Queue().
        return this.count - this.lowestCount;
    }

    isEmpty(){  // Assim como em Queue().
        return this.size() === 0;
    }

    toString(){ // Assim como na classe Queue().
        if(this.isEmpty()){
            return '';
        }
        let objString = `${this.items[this.lowestCount]}`;
        for (let i = this.lowestCount + 1; i < this.count; i++){
            objString = `${objString},${this.items[i]}`;
        }
        return objString;
    }
}

// Vamos instanciar a classe Deque() e começar a testá-la:
const deque = new Deque(); 
console.log("deque.isEmpty()",deque.isEmpty()); // true
console.log("deque.size()",deque.size()); // 0 (zero)
deque.addBack('John');
deque.addBack('Jack');
console.log("deque.size()",deque.size());  // 2
console.log(deque.toString()); // John,Jack
deque.addBack("Camila");
console.log(deque.toString()); // John,Jack,Camila
console.log("deque.isEmpty()",deque.isEmpty()); // false
console.log("deque.size()",deque.size()); // 3
deque.removeFront(); // John foi removido
console.log(deque.toString()); // Jack,Camila
deque.removeBack(); // Camila desistiu de esperar na fila, saiu.
console.log(deque.toString()); // Jack
deque.addFront("John"); // John entra de novo, no início da fila, para pedir informação rápida.
console.log(deque.toString()); // John,Jack


console.log("---------------------------------------------------\n");

// Jogo da Batata Quente
console.log("         Jogo da Batata Quente:\n");
// {1} Para implementar esse jogo vamos usar uma Deque(), mas como se 
// fosse uma fila, isto é, somente inserindo novos elementos no final
// e somente retirando elementos do início. Se quiser usar uma fila, 
// o resultado será o mesmo.
// {2} Vamos obter uma lista de nomes pré-definida como parâmetro de 
// entrada para a nossa função e enfileirar todos eles.
// {3} A batata quente vai passando de mão em mão. Para razer essa 
// simulação, tiramos elementos do fim da fila e inserimos de volta,
// no início da mesma fila. O primeiro elemento da fila é o que está
// com a batata quente na mão.
// {4} Após decorridas algumas passagens de batata quente (num vezes), é
// dado um sinal e a passagem de batata quente tem que parar. Então,
// o primeiro elemente da fila, que está com a batata-quente na mão,
// tem que sair da brincadeira.


function hotPotato(elementsList,num){
    const deque = new Deque(); // {1}
    const eliminatedList = [];
    for(let i = 0; i < elementsList.length; i++){
        deque.addBack(elementsList[i]); // {2}
    }
    while(deque.size() > 1){
        for(let i = 0; i<num; i++){
            deque.addBack(deque.removeFront()); // {3}
        }
        eliminatedList.push(deque.removeFront());
    }
    return{
        eliminated : eliminatedList,
        winner : deque.removeFront()
    };
}

// Podemos usar o código a seguir para testar o algoritmo Hot Potato:
const names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl'];
const result = hotPotato(names, 7);

result.eliminated.forEach(name => {
    console.log(`${name} was eliminated from the Hot Potato game.`);
});

console.log(`The winner is: ${result.winner}`);