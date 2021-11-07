/** Задача 1 - Сущность любой монетки
 * Опишите класс валюты
 * Он должен определять имя(name) валюты, String
 * Содержать количество(value) валюты, Number
 * Содержать количественный тип(unit), в котором исчисляется валюта, String
 * Класс должен предоставлять информацию о типе валюты: Материальная, криптовалюта или металл-депозит
 * Example new Currency("DOGE", 12.5, "satoshi")
 */
 export enum CurrencyType {
    RUB = "material",
    DOGE = "metal-deposit",
    XAU = "металл-депозит",
    USD = "material",
    ETH = "cryptocurrency",
    XRP = "cryptocurrency",
}

type CurrencyName = keyof typeof CurrencyType;

export class Currency {
    private _name: string;
    private _value: number;
    private _unit: string;
    private _type: string;
    constructor (name: string, value: number, unit: string) {
        if(!Object.keys(CurrencyType).includes(name)){
            throw new Error("Unknown currency type");
        }
        if (typeof value !== "number" || Number.isNaN(value) || value < 0) {
            throw new Error("The value must be a number or more then 0");
        }
        if (typeof unit !== "string") {
            throw new Error("unit must be a string");
        }
        
        this._name = name;
        this._value = value;
        this._unit = unit;
        this._type = CurrencyType[name as CurrencyName];
    }
    public get name(): string {
        return this._name;
    }
    public set value(newValue: number) {
        this._value = newValue;
    }
    public get value(): number {
        return this._value;
    }
    public get type(): string {
        return this._type;
    }

}
