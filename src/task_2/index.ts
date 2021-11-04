/** Задача 2 - Много стран, много валют
 * Определите классы следующих валют
 * Dollar
 * Ruble
 * XRP
 * Etherium
 * Gold
*/

import { Currency } from "../task_1";

class Dollar extends Currency {
    constructor(value: number){
        super("USD",value,"dollar");
    }
}

class Ruble extends Currency {
    constructor(value: number){
        super("RUB",value,"ruble");
    }
}

class XRP extends Currency {
    constructor(value: number){
        super("XRP",value,"XRP");
    }
}

class Etherium extends Currency {
    constructor(value: number){
        super("ETH",value,"etherium");
    }
}

class Gold extends Currency {
    constructor(value: number){
        super("XAU",value,"gram");
    }
}

export { Dollar, Etherium, Gold, Ruble, XRP }