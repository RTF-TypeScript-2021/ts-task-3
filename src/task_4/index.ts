/**
 * Задание 4 - Гарантия доставки
 * Денюжки со счета на счет перевести легко, а вот дотащить 3 килограмма палладия, может быть затруднительно
 * Изучите интервейс IContract
 * Опищите и реализуйте функционал сущности Договора-контракта
 * BankingContract - банковский перевод, без задержки
 * SmartContract - перевод через блокчейн, задержка 3000мс
 * LogisticContract - перевозка металла, задержка 6000мс
 */


import {Currency, CurrencyType} from "../task_1";
import {ISecureVaultRequisites, Vault} from "../task_3";

export class SmartContract implements IContract{
    public id: number
    public value: Currency
    public sender: ISecureVaultRequisites
    public receiver: ISecureVaultRequisites
    public state: ContractState

    private static counter: number = 0

    constructor() {
        this.id = SmartContract.counter++
        this.state = ContractState.pending
    }

    signAndTransfer(){
        this.state = ContractState.transfer
        const sender: Vault = Vault.vaultArray.find(x => x.id === this.sender.id)
        const receiver: Vault = Vault.vaultArray.find(x => x.id === this.receiver.id)
        setTimeout(() => {
            if(!this.sender || !this.receiver || !this.value || this.value.type !== CurrencyType.cryptoCurrency){
                this.rejectTransfer()
            }
            try {
                sender.transfer(this.value, receiver)
            }
            catch{
                this.rejectTransfer()
            }
            sender.transfer(this.value, receiver)
            this.closeTransfer()
        }, 3000)
    }

    public closeTransfer(){
        this.state = ContractState.close
    }

    public rejectTransfer(){
        this.state = ContractState.rejected
    }
}

export class BankingContract implements IContract{
    public id: number
    public value: Currency
    public sender: ISecureVaultRequisites
    public receiver: ISecureVaultRequisites
    public state: ContractState

    private static counter: number = 0

    constructor() {
        this.id = BankingContract.counter++
        this.state = ContractState.pending
    }

    signAndTransfer(){
        this.state = ContractState.transfer
        if(!this.sender || !this.receiver || !this.value || this.value.type !== CurrencyType.material) {
            this.rejectTransfer()
        }
        const sender: Vault = Vault.vaultArray.find(x => x.id === this.sender.id)
        const receiver: Vault = Vault.vaultArray.find(x => x.id === this.receiver.id)
        try {
            sender.transfer(this.value, receiver)
        }
        catch{
            this.rejectTransfer()
        }
        sender.transfer(this.value, receiver)
        this.closeTransfer()
    }

    public closeTransfer(){
        this.state = ContractState.close
    }

    public rejectTransfer(){
        this.state = ContractState.rejected
    }
}

export class LogisticContract implements IContract{
    public id: number
    public value: Currency
    public sender: ISecureVaultRequisites
    public receiver: ISecureVaultRequisites
    public state: ContractState

    private static counter: number = 0

    constructor() {
        this.id = LogisticContract.counter++
        this.state = ContractState.pending
    }

    signAndTransfer(){
        this.state = ContractState.transfer
        let sender: Vault = Vault.vaultArray.find(x => x.id === this.sender.id)
        let receiver: Vault = Vault.vaultArray.find(x => x.id === this.receiver.id)
        setTimeout(() => {
            if(!this.sender || !this.receiver || !this.value || this.value.type !== CurrencyType.cryptoCurrency){
                this.rejectTransfer()
            }
            try {
                sender.transfer(this.value, receiver)
            }
            catch{
                this.rejectTransfer()
            }
            sender.transfer(this.value, receiver)
            this.closeTransfer()
        }, 6000)
    }

    public closeTransfer(){
        this.state = ContractState.close
    }

    public rejectTransfer(){
        this.state = ContractState.rejected
    }
}


export interface IContract{
    /**
     * Уникальный номер контракта
     */
    id: number,
    /**
     * Текущее состояние контракта
     */
    state: ContractState,
    /**
     * Предмет контракта
     */
    value: Currency,
    /**
     * Реквизиты отправителя
     */
    sender: ISecureVaultRequisites,
    /**
     * Реквизиты получателя
     */
    receiver: ISecureVaultRequisites,
    /**
     * Начало исполнения контракта
     */
    signAndTransfer: () => void,
    /**
     * Успешное завершение контракта
     */
    closeTransfer: () => void,
    /**
     * Отмена исполнения контракта
     */
    rejectTransfer: () => void
}

export enum ContractState{
    /**
     * Контракт находится в ожидании исполнения
     */
    pending,
    /**
     * Контракт находится в исполнении
     */
    transfer,
    /**
     * Контракт исполнен успешно
     */
    close,
    /**
     * Контракт отменен, либо отклонен
     */
    rejected
}
