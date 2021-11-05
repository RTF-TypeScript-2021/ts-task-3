/** Задача 2 - Много стран, много валют
 * Определите классы следующих валют
 * Dollar
 * Ruble
 * XRP
 * Etherium
 * Gold
*/

import {Currency, CurrencyType} from "../task_1";

export class Dollar extends Currency{
    constructor(value: number) {
        super('Dollar', value, 'USD', CurrencyType.material);
    }
}

export class Ruble extends Currency{
    constructor(value: number) {
        super('Ruble', value, 'RUB', CurrencyType.material);
    }
}

export class XRP extends Currency{
    constructor(value: number) {
        super('XRP', value, 'XRP', CurrencyType.cryptoCurrency);
    }
}

export class Etherium extends Currency{
    constructor(value: number) {
        super('Etherium', value, 'ETH', CurrencyType.cryptoCurrency);
    }
}

export class Gold extends Currency{
    constructor(value: number) {
        super('Gold', value, 'ozt', CurrencyType.metalDeposit); // не знал, в чём брать в унциях или граммах, взял граммы
    }
}
