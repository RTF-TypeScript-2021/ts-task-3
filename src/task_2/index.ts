/** Задача 2 - Много стран, много валют
 * Определите классы следующих валют
 * Dollar
 * Ruble
 * XRP
 * Etherium
 * Gold
*/

import { Currency, CurrencyType } from "../task_1";

export class Dollar extends Currency {
    public currencyType = CurrencyType.Material;

    constructor(count: number) {
        super('dollar', count, 'dollar');
    }
}

export class Etherium extends Currency {
    public currencyType = CurrencyType.Crypto;

    constructor(count: number) {
        super('Ethetium', count, 'ETH');
    }
}

export class Gold extends Currency {
    public currencyType = CurrencyType.MetalDeposit;

    constructor(count: number) {
        super('Gold', count, 'gold');
    }
}

export class Ruble extends Currency {
    public currencyType = CurrencyType.Material;

    constructor(count: number) {
        super('Ruble', count, 'rub');
    }
}

export class XRP extends Currency {
    public currencyType = CurrencyType.Crypto;

    constructor(count: number) {
        super('XRP', count, 'XRP');
    }
}