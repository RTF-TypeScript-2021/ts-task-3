/**
 * Задание 4 - Гарантия доставки
 * Денюжки со счета на счет перевести легко, а вот дотащить 3 килограмма палладия, может быть затруднительно
 * Изучите интервейс IContract
 * Опищите и реализуйте функционал сущности Договора-контракта
 * BankingContract - банковский перевод, без задержки
 * SmartContract - перевод через блокчейн, задержка 3000мс
 * LogisticContract - перевозка металла, задержка 6000мс
 */
import { Currency } from "../task_1";
import { ISecureVaultRequisites } from "../task_3";

class Contract {
    public id: number;
    public state: ContractState;
    public value: Currency;
    public sender: ISecureVaultRequisites;
    public receiver: ISecureVaultRequisites;

    constructor(id: number,
         value: Currency,
         sender: ISecureVaultRequisites,
         receiver: ISecureVaultRequisites) {
        this.id = id;
        this.state = ContractState.pending;
        this.value = value;
        this.sender = sender;
        this.receiver = receiver;
    }

    checkCurrentState(state: ContractState): void {
        if (this.state != state){
            throw new Error(`You can't use this method, because current state is ${this.state}`);
        }
    }
}

export class SmartContract extends Contract implements IContract{
    private timer: NodeJS.Timeout;

    constructor(id: number,
        value: Currency,
        sender: ISecureVaultRequisites,
        receiver: ISecureVaultRequisites) {
       super(id, value, sender, receiver);
    }

    signAndTransfer(): void {
        this.checkCurrentState(ContractState.pending);
        this.state = ContractState.transfer;
        this.timer = setTimeout(() => {
            this.sender.withdraw(this.value);
            this.receiver.deposit(this.value);
            this.closeTransfer();
        }, 3000);
    }

    closeTransfer(): void {
        this.checkCurrentState(ContractState.transfer);
        this.state = ContractState.close;
    }

    rejectTransfer(): void {
        this.checkCurrentState(ContractState.transfer)
        clearTimeout(this.timer);
        this.state = ContractState.rejected;
    }
}

export class BankingContract extends Contract implements IContract{
    constructor(id: number,
        value: Currency,
        sender: ISecureVaultRequisites,
        receiver: ISecureVaultRequisites) {
       super(id, value, sender, receiver);
    }

    signAndTransfer(): void {
        this.checkCurrentState(ContractState.pending);
        this.state = ContractState.transfer;
        this.sender.withdraw(this.value);
        this.receiver.deposit(this.value);
        this.closeTransfer();
    }

    closeTransfer(): void {
        this.checkCurrentState(ContractState.transfer);
        this.state = ContractState.close;
    }

    rejectTransfer(): void {
        this.checkCurrentState(ContractState.transfer);
        this.state = ContractState.rejected;
    }

}

export class LogisticContract extends Contract implements IContract{
    private timer: NodeJS.Timeout;

    constructor(id: number,
        value: Currency,
        sender: ISecureVaultRequisites,
        receiver: ISecureVaultRequisites) {
       super(id, value, sender, receiver);
    }

    signAndTransfer(): void {
        this.checkCurrentState(ContractState.pending);
        this.state = ContractState.transfer;
        this.timer = setTimeout(() => {
            this.sender.withdraw(this.value);
            this.receiver.deposit(this.value);
            this.closeTransfer();
        }, 6000);
    }

    closeTransfer(): void {
        this.checkCurrentState(ContractState.transfer);
        this.state = ContractState.close;
        
    }

    rejectTransfer(): void {
        this.checkCurrentState(ContractState.transfer);
        clearTimeout(this.timer);
        this.state = ContractState.rejected;
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
