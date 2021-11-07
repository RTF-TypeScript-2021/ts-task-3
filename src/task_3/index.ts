/** Задача 3 - Моё хранилище
 *	Напишите класс хранилища(Vault)
 *	Из хранилища можно снимать валюту с помощью withdraw(Currency)
 *	В хранилище можно вкладывать валюту через deposit(Currency)
 *	Из хранлилища, можно переводить валюту через transfer(Currency, Vault)
*/
import { Currency } from "../task_1";

export class Vault implements ISecureVaultRequisites{
    public id: number;
    public store: Set<Currency> = new Set<Currency>()
    
    constructor(){
        this.id = new Date().getTime();
    }

    private findCurrency(name: string): Currency {
        let tmp:Currency = null;
        this.store.forEach(item =>{
            if(item.name === name){
                tmp = item;
            }
        })

        return tmp;
    }

    public withdraw(currency: Currency) {
        const currencyPtr: Currency = this.findCurrency(currency.name);
        if(currencyPtr && currencyPtr.value>=currency.value) {
            currencyPtr.value -= currency.value;
        } else {
            throw new Error("not enough money or name of currency not in store");
        }
    }

    public deposit(currency: Currency){
        const currencyPtr: Currency = this.findCurrency(currency.name);
        if(currencyPtr) {
            currencyPtr.value += currency.value;
        } else {
            this.store.add(currency);
        }
    }

    public transfer(currency: Currency, recipient: Vault) {
        //упадет если будет недостаточно средств, а если все ок, то переводим
        this.withdraw(currency);
        recipient.deposit(currency);
    }
}

export interface ISecureVaultRequisites{
    id: number,
}
