/** Задача 1 - Сущность любой монетки
 * Опишите класс валюты
 * Он должен определять имя(name) валюты, String
 * Содержать количество(value) валюты, Number
 * Содержать количественный тип(unit), в котором исчисляется валюта, String
 * Класс должен предоставлять информацию о типе валюты: Материальная, криптовалюта или металл-депозит
 * Example new Currency("DOGE", 12.5, "satoshi")
 */

 export class Currency{
    name: string;
    value: number;
    unit: string;
    protected type: CurrencyType;

    constructor(name: string, value: number, unit: string) {
        if (!name || !unit || value < 0) {
            throw new Error('Invalid args');
        }
        this.name = name;
        this.value = value;
        this.unit = unit;
    }
}

export enum CurrencyType {
    Dollar = 'Material',
    Ruble = 'Material',
    XRP = 'Crypt',
    Etherium = 'Crypt',
    Gold = 'Metal'
}
