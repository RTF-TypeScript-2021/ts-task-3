/**
 * Задание 5 - Власть банков
 * В этой задаче вам нужно реализовать класс контроллер
 * 1. registerVault(): ISecureVaultRequisites - регистрирует хранилище в банке
 * 2. proceedContract(IContract): void - проводит договор между счетами
 * 3. Класс контроллера должен быть реализацией паттерна Singleton
 *
 * Хранилища должны быть сохранены в массив vaultStore: Vault[]
 */
import {ContractState, IContract} from "../task_4";
import {ISecureVaultRequisites, Vault} from "../task_3";

export class BankController{
    static instance: BankController
    public vaultStore: Vault[]
    constructor() {
        if(BankController.instance){
            return BankController.instance
        }
        BankController.instance = this
    }

    public registerVault(vault: Vault): ISecureVaultRequisites {
        this.vaultStore.push(vault)
        return {id: vault.id}
    }

    public proceedContract(contract: IContract) {
        if(contract.state !== ContractState.pending || contract.value){
            contract.rejectTransfer
            throw new Error('Контракт начался без согласования или не коректен обьект контракта')
        }
        let senderExist = false
        let receiverExist = false
        this.vaultStore.forEach(x => {
            if(x === contract.sender){
                senderExist = true
            }
            if(x === contract.receiver){
                receiverExist = true
            }
        })
        if(!senderExist || !receiverExist){
            contract.rejectTransfer()
            throw new Error('Отправитель или получатеть не зарегестрированны')
        }
        contract.signAndTransfer()
    }
}

