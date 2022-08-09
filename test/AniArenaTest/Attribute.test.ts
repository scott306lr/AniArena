import { Attribute, Attribute_JSON } from "../../src/utils/AniClasses/Attribute"

describe('Attribute Test', () => {
    let attr: Attribute_JSON;
    beforeEach( () => {
        attr = {
            level: 5,
            exp: 8,
            HP: 67,
            AP: 20,
            APRegen: 7
        };
    })

    it('Reset', () => {
        let attribute = new Attribute(attr);
        let exp = attribute.exp.get();
        attribute.exp.set(3);
        attribute.reset();
        expect(attribute.exp.get()).toBe(exp);
    });

    it('Reset with new data', () => {
        let attribute = new Attribute(attr);
        let newdata = JSON.parse(JSON.stringify(attr));
        newdata.HP = 1000;
        newdata.exp = 1000;
        attribute.reset(newdata);

        expect(attribute.HP.get()).toBe(1000);
        expect(attribute.exp.get()).toBe(1000);

    });

    it('Deep Copy', () => {

        let attribute = new Attribute(attr);
        let exp = attribute.exp.get();

        attr.exp = -1;
        attribute.reset();

    
        expect(attribute.exp.get()).toBe(exp);

    });
})