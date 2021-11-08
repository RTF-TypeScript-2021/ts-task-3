/** Задача 3 - Моё хранилище
 *	Напишите класс хранилища(Vault)
 *	Из хранилища можно снимать валюту с помощью withdraw(Currency)
 *	В хранилище можно вкладывать валюту через deposit(Currency)
 *	Из хранлилища, можно переводить валюту через transfer(Currency, Vault)
*/
import { Currency } from "../task_1";

export class Vault implements ISecureVaultRequisites{
	public id: number;
	public store: Set<Currency> = new Set<Currency>();
	
	public deposit(currency: Currency): void {
		let currencies = Array.from(this.store.values());
		let indexCurrency = currencies.findIndex(c => c.name === currency.name);
		if (indexCurrency != -1) {
			currencies[indexCurrency].count += currency.count;
		} else {
			this.store.add(currency);
		}
		this.store.add(currency);
	}

	public withdraw(currency: Currency): void {
		let currencies = Array.from(this.store.values());
		let indexCurrency = currencies.findIndex(c => c.name === currency.name);
		if (indexCurrency != -1) {
			if (currency.count > currencies[indexCurrency].count) {
				let count = currencies[indexCurrency].count;
				let unit = currencies[indexCurrency].unit;
				throw new Error(`You can't withdraw more than ${count} ${unit}`);
			} else {
				currencies[indexCurrency].count -= currency.count;
			}
		} else {
			throw new Error(`There is no such currency: ${currency.name}`);
		}
	}

	public transfer(currency: Currency, vault: Vault): void {
		this.withdraw(currency);
		vault.deposit(currency);
	}
}


export interface ISecureVaultRequisites{
	id: number;
	deposit(currency: Currency): void;
	withdraw(currency: Currency): void;
}
