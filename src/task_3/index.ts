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
	public static vaultArray: Vault[] = []

	constructor() {
		Vault.vaultArray.push(this)
		this.id = Vault.vaultArray.length
	}

	public deposit(currency: Currency): void{
		let onUpdate = false
		this.store.forEach(x=>{
			if(x.name === currency.name){
				onUpdate = true
				x.value += currency.value
			}
		})
		if (!onUpdate){
			this.store.add(currency)
		}
	}

	public withdraw(currency: Currency): void{
		let existCurrency = false
		this.store.forEach(x=>{
			if(x.name === currency.name && x.value >= currency.value){
				existCurrency = true
				x.value -= currency.value
				if(!x.value){
					this.store.delete(x)
				}
			}
		})
		if(!existCurrency){
			throw new Error('incorrect request')
		}
	}

	public transfer(currency: Currency, vault: Vault): void{
		try {
			this.withdraw(currency)
		}
		catch {
			throw new Error('incorrect request')
		}
		vault.deposit(currency)
	}
}



export interface ISecureVaultRequisites{
	id: number
}
