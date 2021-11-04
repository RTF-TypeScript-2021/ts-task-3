import { Vault } from "../src/task_3";
import { Dollar, Ruble, XRP } from "../src/task_2";

test("Vault instance successfully", () => {
    expect(
         new Vault()
    ).toBeInstanceOf(Vault);
})

test("Vault able to store multiple Currency", () => {
    const v1 = new Vault();
    expect(v1.store.size).toBe(0);

    v1.deposit(new Dollar(23));
    v1.deposit(new XRP(12));

    expect(v1.store.size).toBe(2);
})

test("Vault able to withdraw correct amount of Currency", () => {
    const v1 = new Vault()
    v1.deposit(new Ruble(9000))
    v1.deposit(new XRP(1200))
    v1.withdraw(new Ruble(3400))
    expect(Array.from(v1.store.values()).find(x => x.name === "RUB").value).toBe(5600);
})

test("Vault throws error on uncorrect withdraw", () => {
    const v1 = new Vault()
    v1.deposit(new XRP(1200))
    expect(() => {
        v1.withdraw(new XRP(3333))
    }).toThrow();
})

test("Transfer between vaults going successfully", () => {
    const v1 = new Vault()
    const v2 = new Vault()

    v1.deposit(new Ruble(6000))
    v1.transfer(new Ruble(3000), v2)

    expect(v2.store.size).toBe(1);
    expect(Array.from(v1.store.values()).find(x => x.name === "RUB").value).toBe(3000);
})

test("Transfer with uncorrect amount of Currency throws error", () => {
    const v1 = new Vault()
    const v2 = new Vault()

    v1.deposit(new Ruble(6000))
    expect(() => {
        v1.transfer(new Ruble(30000), v2)
    }).toThrow();
})