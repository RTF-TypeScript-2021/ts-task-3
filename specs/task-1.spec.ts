import { Currency } from "../src/task_1";


test('Currency creating successfully', () => {
    const rubleAbstract = new Currency("RUB", 0, 'rub')

    expect(rubleAbstract).toBeInstanceOf(Currency);
});

test('Currency creating fails on unexpected DATA', () => {

    expect(() => {
        new Currency("ru", -1002, 'rub')
    }).toThrow();

    expect(() => {
        //@ts-ignore
        new Currency('', '213', 123)
    }).toThrow();

    expect(() => {
        new Currency('alpha', undefined, undefined)
        }).toThrow();
});