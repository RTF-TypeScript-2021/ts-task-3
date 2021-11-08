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
    private vaults = new Array<Vault>();

    public registerVault(): ISecureVaultRequisites{
        let newVault = new Vault();
        this.vaults.push(newVault);
        return newVault;
    }

    public proceedContract(contract: IContract) {
        const sender = this.vaults.find(vault => vault.id === contract.sender.id);
        const receiver = this.vaults.find(vault => vault.id === contract.receiver.id);
        contract.signAndTransfer();
        sender.transfer(contract.value, receiver);
    }
}

