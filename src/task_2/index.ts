/** Задача 2 - Много стран, много валют
 * Определите классы следующих валют
 * Dollar
 * Ruble
 * XRP
 * Etherium
 * Gold
*/

import {Currency, CurrencyType} from "../task_1";

export class Dollar extends Currency {
    constructor(value: number) {
        super("Dollar", value, "usd");
        this.type = CurrencyType.Dollar;
    }
}

export class Ruble extends Currency {
    constructor(value: number) {
        super("Ruble", value, "rub");
        this.type = CurrencyType.Ruble;
    }
}

export class XRP extends Currency {
    constructor(value: number) {
        super("XRP", value, "xrp");
        this.type = CurrencyType.XRP;
    }
}

export class Etherium extends Currency {
    constructor(value: number) {
        super("Etherium", value, "eth");
        this.type = CurrencyType.Etherium;
    }
}

export class Gold extends Currency {
    constructor(value: number) {
        super("Gold", value, "g");
        this.type = CurrencyType.Gold;
    }
}
