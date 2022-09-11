import { Attribute } from '../../src/utils/AniClasses/Attribute';
import { Attribute_JSON } from '../../src/utils/AniClasses/Types';

describe('Attribute Test', () => {
  let attr: Attribute_JSON;
  beforeEach(() => {
    attr = {
      level: 5,
      exp: 8,
      HP: 67,
      AP: 20,
      APRegen: 7,
    };
  });

  it('Reset', () => {
    const attribute = new Attribute(attr);
    const exp = attribute.exp.get();
    attribute.exp.set(3);
    attribute.reset();
    expect(attribute.exp.get()).toBe(exp);
  });

  it('Reset with new data', () => {
    const attribute = new Attribute(attr);
    const newdata = JSON.parse(JSON.stringify(attr));
    newdata.HP = 1000;
    newdata.exp = 1000;
    attribute.reset(newdata);

    expect(attribute.HP.get()).toBe(1000);
    expect(attribute.exp.get()).toBe(1000);
  });

  it('Deep Copy', () => {
    const attribute = new Attribute(attr);
    const exp = attribute.exp.get();

    attr.exp = -1;
    attribute.reset();

    expect(attribute.exp.get()).toBe(exp);
  });
});
