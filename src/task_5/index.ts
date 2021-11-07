/**
 * Задание 5 - Власть банков
 * В этой задаче вам нужно реализовать класс контроллер
 * 1. registerVault(): ISecureVaultRequisites - регистрирует хранилище в банке
 * 2. proceedContract(IContract): void - проводит договор между счетами
 * 3. Класс контроллера должен быть реализацией паттерна Singleton
 *
 * Хранилища должны быть сохранены в массив vaultStore: Vault[]
 */
import { ContractState, IContract } from "../task_4";
import { ISecureVaultRequisites, Vault } from "../task_3";

export class BankController{
    private static _instance: BankController;
    private static _vaultStore = new Array<ISecureVaultRequisites>();
    constructor() {
        if (BankController._instance){
            return BankController._instance;
        } else {
            BankController._instance = this;
        }
    }

    public static registerVault(): ISecureVaultRequisites{
        const vault = new Vault();
        BankController._vaultStore.push(vault);

        return vault;
    }

    public static proceedContract(contract: IContract): void {
        contract.sender = BankController._vaultStore.find(vault => vault.id === contract.sender.id);
        contract.receiver = BankController._vaultStore.find(vault => vault.id === contract.receiver.id);
        if( contract.sender instanceof Vault && 
            contract.receiver instanceof Vault && 
            contract.state === ContractState.pending){
            contract.signAndTransfer();
        } else {
            throw new Error("Contract is not valid, check the status of the contract and storage instance");
        }
        
    }
}