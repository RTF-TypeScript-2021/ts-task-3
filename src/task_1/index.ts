/** Задача 1 - Сущность любой монетки
 * Опишите класс валюты
 * Он должен определять имя(name) валюты, String
 * Содержать количество(value) валюты, Number
 * Содержать количественный тип(unit), в котором исчисляется валюта, String
 * Класс должен предоставлять информацию о типе валюты: Материальная, криптовалюта или металл-депозит
 * Example new Currency("DOGE", 12.5, "satoshi")
 */
 export enum CurrencyType {
    RUB = "материальная",
    DOGE = "крипта",
    XAU = "золото",
    USD = "материальная",
    ETH = "крипта",
    XRP = "крипта",
}

type CurrencyName = keyof typeof CurrencyType;

export class Currency{
    private _name: string;
    private _value: number;
    private _unit: string;
    private _type: string;
    constructor (name: string, value: number, unit: string) {
        if(!Object.keys(CurrencyType).includes(name)){
            throw new Error("поел");
        }
        if (typeof value !== "number" || Number.isNaN(value)) {
            throw new Error("не та");
        }
        if (value < 0) {
            throw new Error("слишком мал");
        }
        if (typeof unit !== "string") {
            throw new Error("да что ты говоришь моя хорошая");
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
