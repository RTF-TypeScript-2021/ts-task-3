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

export class SmartContract implements IContract{
    id: number;
    receiver: ISecureVaultRequisites;
    sender: ISecureVaultRequisites;
    state: ContractState;
    value: Currency;

    constructor() {
        this.state = ContractState.pending;
    }

    closeTransfer(): void {
        this.state = ContractState.close
    }

    rejectTransfer(): void {
        this.state = ContractState.rejected
    }

    signAndTransfer(): void {
        this.state = ContractState.transfer;
        setTimeout(this.closeTransfer, 3000);

        // this.state = ContractState.transfer;
        // try{
        //     (<Vault> this.sender).withdraw(this.value);
        //     (<Vault> this.receiver).deposit(this.value);
        //     setTimeout(this.closeTransfer, 3000);
        // } catch (e) {
        //     this.rejectTransfer();
        // }
    }

}

export class BankingContract implements IContract{
    id: number;
    receiver: ISecureVaultRequisites;
    sender: ISecureVaultRequisites;
    state: ContractState;
    value: Currency;

    constructor() {
        this.state = ContractState.pending;
    }

    closeTransfer(): void {
        this.state = ContractState.close
    }

    rejectTransfer(): void {
        this.state = ContractState.rejected
    }

    signAndTransfer(): void {
        this.state = ContractState.transfer;
        this.closeTransfer();

        // this.state = ContractState.transfer;
        // try{
        //     this.sender.withdraw(this.value);
        //     this.receiver.deposit(this.value);
        //     this.closeTransfer();
        // } catch (e) {
        //     this.rejectTransfer();
        // }
    }
}

export class LogisticContract implements IContract{
    id: number;
    receiver: ISecureVaultRequisites;
    sender: ISecureVaultRequisites;
    state: ContractState;
    value: Currency;

    constructor() {
        this.state = ContractState.pending;
    }

    closeTransfer(): void {
        this.state = ContractState.close
    }

    rejectTransfer(): void {
        this.state = ContractState.rejected
    }

    signAndTransfer(): void {
        this.state = ContractState.transfer;
        setTimeout(this.closeTransfer, 6000);

        // this.state = ContractState.transfer;
        // try{
        //     this.sender.withdraw(this.value);
        //     this.receiver.deposit(this.value);
        //     setTimeout(this.closeTransfer, 6000);
        // } catch (e) {
        //     this.rejectTransfer();
        // }
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
