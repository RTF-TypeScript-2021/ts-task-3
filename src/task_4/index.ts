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
import { ISecureVaultRequisites, Vault } from "../task_3";

abstract class Contract implements IContract{
    id: number;
    state: ContractState;
    value: Currency;
    sender: ISecureVaultRequisites;
    receiver: ISecureVaultRequisites;

    constructor() {
        this.id = new Date().getTime();
        this.state = ContractState.pending;
    }

    signAndTransfer(): void {
        if(!this.sender || !this.value || !this.receiver){
            throw new Error("sender, receiver or value is not valid");
        }
    }

    closeTransfer() : void {
        this.state = ContractState.close;
    }

    rejectTransfer() : void {
        this.state = ContractState.rejected;
    }
}

export class SmartContract extends Contract{
    constructor() {
        super();
    }
    signAndTransfer(): void{
        super.signAndTransfer();
        if( this.value.type !== "cryptocurrency" ) {
            throw new Error("Smart Contract must use only with cryptocurrency");
        }
        this.state = ContractState.transfer;
        try {
            (this.sender as Vault).withdraw(this.value);
            setTimeout(()=>{
                (this.receiver as Vault).deposit(this.value);

                return this.closeTransfer();
            }, 3000);
        } catch {
            this.rejectTransfer();
        }
    }
}

export class BankingContract extends Contract {
    constructor() {
        super();
    }
    signAndTransfer() {
        super.signAndTransfer();
        if( this.value.type !== "material" ) {
            throw new Error("Smart Contract must use only with material currency");
        }
        this.state = ContractState.transfer;
        try {
            (this.sender as Vault).transfer(this.value, this.receiver as Vault);
            this.closeTransfer();
        } catch {
            return this.rejectTransfer();
        }
    }
}

export class LogisticContract extends Contract {
    constructor() {
        super();
    }
    signAndTransfer(): void {
        super.signAndTransfer();
        this.state = ContractState.transfer;
        if( this.value.type !== "metal-deposit" ) {
            throw new Error("Smart Contract must use only with metal-deposit currency");
        }
        try {
            (this.sender as Vault).withdraw(this.value);
            setTimeout(()=>{
                (this.receiver as Vault).deposit(this.value);

                this.closeTransfer();
            }, 6000);
        } catch {
            this.rejectTransfer();
        }
    }
}

export interface IContract {
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
