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

class Contract implements IContract{
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
        if (!this.id || !this.sender || !this.receiver || !this.value){
            this.rejectTransfer();
        }

        this.state = ContractState.transfer;
        try{
            this.closeTransfer();
        } catch (e) {
            this.rejectTransfer();
        }
    }

}

export class SmartContract extends Contract{
    public closeTransfer() {
        setTimeout(() => super.closeTransfer(),3000);
    }
}

export class BankingContract extends Contract{}

export class LogisticContract extends Contract{
    public closeTransfer() {
        setTimeout(() => super.closeTransfer(),6000);
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
