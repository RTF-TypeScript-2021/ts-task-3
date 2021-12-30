/** Задача 1 - Сущность любой монетки
 * Опишите класс валюты
 * Он должен определять имя(name) валюты, String
 * Содержать количество(value) валюты, Number
 * Содержать количественный тип(unit), в котором исчисляется валюта, String
 * Класс должен предоставлять информацию о типе валюты: Материальная, криптовалюта или металл-депозит
 * Example new Currency("DOGE", 12.5, "satoshi")
 */

export class Currency{
    private readonly _name : string;
    private _value : number;
    private readonly _unit : string;
    readonly _type: CurrencyType;

    get name() {
        return this._name;
    }

    get value() {
        return this._value;
    }

    set value(newValue: number) {
        if (newValue < 0) {
            throw new Error();
        }
        this._value = newValue;
    }

    get unit() {
        return this._unit;
    }

    get type() {
        return this._type;
    }

    constructor(name: string, value: number, unit: string, type?: CurrencyType) {
        if (!name || value < 0 || value === undefined || !unit) {
            throw new Error();
        }
        this._name = name;
        this._value = value;
        this._unit = unit;
        if(type){
            this._type = type
        } else if (name in MaterialNames) {
            this._type = CurrencyType.Material
        } else if(name in CryptoNames){
            this._type = CurrencyType.Crypt
        } else if(name in MetalNames){
            this._type = CurrencyType.Metal
        } else {
            throw new Error()
        }
    }
}

export enum CurrencyType {
    Material,
    Crypt,
    Metal,
}

enum MaterialNames {
    Dollar,
    Ruble,
    ru,
}

enum CryptoNames {
    XRP,
    Etherium,
    alpha,
}

enum MetalNames {
    Gold,
}