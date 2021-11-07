/**
 * Задание 5 - Власть банков
 * В этой задаче вам нужно реализовать класс контроллер
 * 1. registerVault(): ISecureVaultRequisites - регистрирует хранилище в банке
 * 2. proceedContract(IContract): void - проводит договор между счетами
 * 3. Класс контроллера должен быть реализацией паттерна Singleton
 *
 * Хранилища должны быть сохранены в массив vaultStore: Vault[]
 */
import { IContract } from "../task_4";
import { ISecureVaultRequisites, Vault } from "../task_3";

export class BankController{

    static instance: BankController;
    vaultStore: Vault[]

    constructor() {
        if(BankController.instance){
            return BankController.instance;
        }
        BankController.instance = this;
    }

    public registerVault(vault: Vault): ISecureVaultRequisites{
        this.vaultStore.push(vault);

        return {id: vault.id};
    }

    public proceedContract(contract: IContract) {
        let receiver;
        let sender;
        for(const i of this.vaultStore){
            if(i.id === contract.sender.id){
                sender = i;
            } else if(i.id === contract.receiver.id){
                receiver = i;
            }
        }

        if (sender && receiver){
            sender.transfer(contract.value, receiver);
        } else {
            contract.rejectTransfer();
        }
        contract.signAndTransfer();
    }
}
