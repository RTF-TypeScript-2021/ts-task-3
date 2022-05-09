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

	withdraw(currency: Currency): void {
		const storedCurr = Array.from(this.store).find(x => x.name === currency.name);
		if (!storedCurr || storedCurr.value < currency.value) {
			throw new Error("Vault doesn't contains this currency");
		} else {
			storedCurr.value -= currency.value;
		}
	}

	deposit(currency: Currency): void {
		const storedCurr = Array.from(this.store).find(x => x.name === currency.name);
		if (!storedCurr) {
			this.store.add(currency);
		} else {
			storedCurr.value += currency.value;
		}
	}

	transfer(currency: Currency, toVault: ISecureVaultRequisites): void {
		this.withdraw(currency);
		toVault.deposit(currency);
	}
}


export interface ISecureVaultRequisites{
	id: number
	withdraw(currency: Currency): void;
	deposit(currency: Currency): void;
	transfer(currency: Currency, toVault: ISecureVaultRequisites): void;
}
