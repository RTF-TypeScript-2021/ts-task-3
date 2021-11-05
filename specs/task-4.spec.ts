import { Vault } from "../src/task_3";
import { ContractState, SmartContract } from "../src/task_4";
import { XRP } from "../src/task_2";


test("Smart", () =>{
    const v1 = new Vault()
    const v2 = new Vault()
    v1.deposit(new XRP(24))

    const smart = new SmartContract()
    expect(
        smart.state
    ).toBe(ContractState.pending);

    smart.sender = {id: v1.id};
    smart.receiver = {id: v2.id}
    smart.value = new XRP(20)
    smart.signAndTransfer();

    expect(smart.state).toBe(ContractState.transfer)
})