import { Attribute, Attribute_JSON, IntAttribute } from "../../client/AniClasses/Attribute"

describe('Attribute Test', () => {
    let attribute_JSON;
    beforeEach( () => {
        attribute_JSON = {
            Level: 5,
            Exp: 8,
            HP: 67,
            AP: 20,
            APRegen: 7
        };
    })

    it('Reset', () => {
        let attribute = new Attribute(attribute_JSON);
        let exp = attribute.exp.get();
        attribute.exp.set(3);
        attribute.reset();
        expect(attribute.exp.get()).toBe(exp);
    });

    it('Reset with new data', () => {
        let attribute = new Attribute(attribute_JSON);
        let newdata = JSON.parse(JSON.stringify(attribute_JSON));
        newdata.HP = 1000;
        newdata.Exp = 1000;
        attribute.reset(newdata);

        expect(attribute.HP.get()).toBe(1000);
        expect(attribute.exp.get()).toBe(1000);

    });

    it('Deep Copy', () => {

        let attribute = new Attribute(attribute_JSON);
        let exp = attribute.exp.get();

        attribute_JSON.Exp = -1;
        attribute.reset();

    
        expect(attribute.exp.get()).toBe(exp);

    });
})