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

	withdraw(currency: Currency){
		this.store.forEach(e => {
			if (e.name === currency.name){
				if(e.value < currency.value){
					throw "error"
				}
				e.value -= currency.value;
			}
			if (e.value === 0){
				this.store.delete(currency)
			}
		})

	}

	deposit(currency: Currency){
		let hasCurrency = false
		this.store.forEach(e => {
			if (e.name === currency.name){
				hasCurrency = true;
				e.value += currency.value;
			}
		})

		if (!hasCurrency) {
			this.store.add(currency)
		}
	}

	transfer(currency: Currency, vault: Vault){
		this.withdraw(currency);
		vault.deposit(currency);
	}
}


export interface ISecureVaultRequisites{
	id: number
}
