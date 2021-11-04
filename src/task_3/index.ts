/** Задача 3 - Моё хранилище
 *	Напишите класс хранилища(Vault)
 *	Из хранилища можно снимать валюту с помощью withdraw(Currency)
 *	В хранилище можно вкладывать валюту через deposit(Currency)
 *	Из хранлилища, можно переводить валюту через transfer(Currency, Vault)
*/
import { Currency } from "../task_1";

export class Vault implements ISecureVaultRequisites{
	private _id: number;
	private _store: Set<Currency> = new Set<Currency>()
	
	public get id(): number {
		return this._id
	}
	public get store(): Set<Currency>{
		return this._store;
	}
	private findCurrency(name: string): Currency {
		let tmp:Currency = null;
		this._store.forEach(item =>{
			if(item.name === name){
				tmp = item;
			}
		})

		return tmp;
	}

	public withdraw(currency: Currency): number {
		const currencyPtr: Currency = this.findCurrency(currency.name);
		if(currencyPtr && currencyPtr.value>=currency.value) {
			currencyPtr.value -= currency.value;
			
			return currency.value;
		} else {
			throw new Error("малло или отсутствует");
		}
	}

	public deposit(currency: Currency): boolean {
		const currencyPtr: Currency = this.findCurrency(currency.name);
		if(currencyPtr) {
			currencyPtr.value += currency.value;
		} else {
			this._store.add(currency);
		}

		return true;
	}

	public transfer(currency: Currency, recipient: Vault): boolean {
		//упадет если будет недостаточно средств, а если все ок, то переводим
		this.withdraw(currency); 
		recipient.deposit(currency);

		return true;
	}
}

export interface ISecureVaultRequisites{
	id: number,
	store: Set<Currency>,
	withdraw(currency: Currency):number,
	deposit(currency: Currency):boolean,
	transfer(currency: Currency, recipient: Vault):boolean,
}
