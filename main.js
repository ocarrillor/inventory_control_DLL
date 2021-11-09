class Product{
    constructor(id, name, amount, cost){
        this.id = Number(id);
        this.name = name;
        this.amount = Number(amount);
        this.cost = Number(cost);
        this.prev = null;
        this.next = null;
    }

    getValue(){
        return this.amount * this.cost;
    }

    info(){
        return `<p>${this.id}  ${this.name}  $${this.amount}  $${this.cost}  $${this.getValue()}</p>`;
    }
}

class Inventory{
    constructor(){
        this.first = null;
    }

    add(newObject){
        if (this.first == null){
            this.first = newObject;
        } else if(this.search(newObject.id) == null){
            this.resetFirst();
            let temp = this.first;
            while (newObject.prev == null && newObject.next == null){
                if(newObject.id < temp.id){
                    if(temp.prev == null){
                        temp.prev = newObject;
                        newObject.next = temp;
                    }else{
                        temp.prev.next = newObject;
                        newObject.prev = temp.prev;
                        temp.prev = newObject;
                        newObject.next = temp;
                    }
                }else{
                    if(temp.next == null){
                        temp.next = newObject;
                        newObject.prev = temp;
                    }
                }
                temp = temp.next;
            }
        }else{
            return null;
        }
        return newObject;
    }

    search(id){
        this.resetFirst();
        let temp = this.first;
        while(temp != null){
            if(temp.id == id){
                return temp;
            }
            temp = temp.next;
        }
        return null;
    }

    delete(id){
        this.resetFirst();
        let temp = this.first;
        let deleted = null;

        if(temp.next == null){
            if(temp.id == id){
                deleted = temp;
                temp = null;
                this.first = null;
            }
        }else{
            while(temp != null && deleted == null){
                if(temp.id == id){
                    deleted = temp;
                    if(temp.prev == null){
                        temp.next.prev = null;
                        temp = null;
                    }else if(temp.next == null){
                        temp.prev.next = null;
                        temp = null;
                    }else{
                        temp.prev.next = temp.next;
                        temp.next.prev = temp.prev;
                        temp = null;
                    }
                }else{
                    temp = temp.next;
                }
            }
        }
        return deleted;
    }

    resetFirst(){
        if(this.first != null){
            let temp = this.first;

            while(temp.next != null){
                temp = temp.next;
            }

            while(temp.prev != null){
                temp = temp.prev;
            }
            this.first = temp;
        }
    }
    
    listAsc(){
        this.resetFirst();
        let list = '';
        let temp = this.first;

        while(temp != null){
            list += temp.info() + ' ';
            temp = temp.next;
        }
        return list;
    }

    listDes(){
        this.resetFirst();
        let list = '';
        let temp = this.first;

        while(temp != null && temp.next != null){
            temp = temp.next;
        }

        while(temp != null){
            list += temp.info() + ' ';
            temp = temp.prev;
        }
        return list;
    }
}

class Interface{
    show(info){
        let details=document.getElementById('detalles');
        details.innerHTML = `<br> La info es: <br> ${info}`;
    }
}

let invent = new Inventory();
let ui = new Interface();
const btnAdd=document.getElementById('btnAdd');
btnAdd.addEventListener('click',()=>{
    let id = document.getElementById('idA').value;
    let name = document.getElementById('name').value;
    let amount = document.getElementById('amount').value;
    let cost = document.getElementById('cost').value;
    let product = new Product(id, name, amount, cost);
    ui.show(invent.add(product).info());
});

const btnDelete=document.getElementById('btnDelete');
btnDelete.addEventListener('click',()=>{
    let id = document.getElementById('idE').value;
    ui.show(invent.delete(id).info());
});

const btnSearch=document.getElementById('btnSearch');
btnSearch.addEventListener('click',()=>{
    let id = document.getElementById('idB').value;
    ui.show(invent.search(id).info());
});

const btnListAsc=document.getElementById('btnListAsc');
btnListAsc.addEventListener('click',()=>{
    ui.show(invent.listAsc());
});

const btnListDes=document.getElementById('btnListDes');
btnListDes.addEventListener('click',()=>{
    ui.show(invent.listDes());
});