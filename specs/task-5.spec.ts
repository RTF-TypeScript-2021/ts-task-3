import { Dollar, Ruble, Gold } from "../src/task_2";
import { Vault } from "../src/task_3";
import { BankingContract, ContractState, SmartContract } from "../src/task_4";
import {BankController} from "../src/task_5";


test("BankController", () =>{
    
    const dollar = new Dollar(1000);
    const rub = new Ruble(200);
    const gold = new Gold(100);
    const gold2 = new Gold(100);

    let bk = new BankingContract();
    const sk = new SmartContract();

    const v1 = BankController.registerVault();
    (v1 as Vault).deposit(new Ruble(1000));
    const v2 = BankController.registerVault();
    (v2 as Vault).deposit(new Ruble(1000));

    bk.sender = {id : v1.id};
    bk.receiver = {id : v2.id};
    bk.value = rub;

    //Some tests
    BankController.proceedContract(bk);
    expect(bk.state).toBe(ContractState.close);
    
    bk = new BankingContract();
    bk.sender = {id : 123};
    bk.receiver = {id : v2.id};
    bk.value = rub;
    expect(()=>BankController.proceedContract(bk)).toThrow();

    sk.sender = {id : v1.id};
    sk.receiver = {id : v2.id};
    sk.value = rub;
    expect(()=>BankController.proceedContract(sk)).toThrow();
})