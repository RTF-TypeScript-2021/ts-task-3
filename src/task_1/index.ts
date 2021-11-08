/** Задача 1 - Сущность любой монетки
 * Опишите класс валюты
 * Он должен определять имя(name) валюты, String
 * Содержать количество(value) валюты, Number
 * Содержать количественный тип(unit), в котором исчисляется валюта, String
 * Класс должен предоставлять информацию о типе валюты: Материальная, криптовалюта или металл-депозит
 * Example new Currency("DOGE", 12.5, "satoshi")
 */

export class Currency{
    public name: string;
    public count: number;
    public unit: string;

    constructor (name: string, count: number, unit: string) {
        let isCorrect = count >= 0 && name.length > 0 
                     && name != undefined && count != undefined
                     && unit != undefined;
        if (!isCorrect) {
            throw new Error('Incorrect arguments');
        }
        this.name = name;
        this.count = count;
        this.unit = unit;
    }
}

export enum CurrencyType {
    Material,
    Crypto,
    MetalDeposit
}
