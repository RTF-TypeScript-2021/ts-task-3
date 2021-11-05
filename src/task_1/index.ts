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

    constructor(name: string, value: number, unit: string){
        if (value < 0 || name === '' || name === undefined || value === undefined || unit === undefined){
            throw "error"
        }
            this.name = name
            this.value = value
            this.unit = unit
    }
}

export enum CurrencyType {

}
