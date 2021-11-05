/** Задача 1 - Сущность любой монетки
 * Опишите класс валюты
 * Он должен определять имя(name) валюты, String
 * Содержать количество(value) валюты, Number
 * Содержать количественный тип(unit), в котором исчисляется валюта, String
 * Класс должен предоставлять информацию о типе валюты: Материальная, криптовалюта или металл-депозит
 * Example new Currency("DOGE", 12.5, "satoshi")
 */

export class Currency{
    public name: string
    public value: number
    public unit: string
    public type: CurrencyType
    constructor(name: string, value: number, unit: string, type?: CurrencyType) {
        if (!name || !unit || value < 0 || value === 1/0) {
            throw new Error('incorrect data')
        }
        this.name = name
        name.toUpperCase()
        this.value = value
        this.unit = unit.toUpperCase()
        if(type){
            this.type = type
        }
        else if (name in MetalDepositName) { //В энумах я перечислил самые популярные варианты, не думаю, что понадобится больше, допустим мой сервис работает только с этими
            this.type = CurrencyType.metalDeposit
        }
        else if(this.unit in MaterialCurrencyName){
            this.type = CurrencyType.material
        }
        else if(name in CryptoCurrencyName){
            this.type = CurrencyType.cryptoCurrency
        }
        else throw new Error('unknown name')
    }
}

export enum CurrencyType {
    material,
    cryptoCurrency,
    metalDeposit
}

enum MetalDepositName{
    GOLD,
    SILVER,
    PLATINUM,
    PALLADIUM
}

enum MaterialCurrencyName{
    RUB,
    USD,
    EUR,
    GBP,
    CNY,
    JPY
}

enum CryptoCurrencyName{
    BTC,
    ETH,
    BNB,
    SOL,
    USDT,
    XRP,
    DOGE
}
