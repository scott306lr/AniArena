import Abilities from "./AniClasses/Abilities";

describe('Abilities', () => {
    it('constructor', () => {
        let abi = new Abilities(1, 2, 3, 4);
        expect(abi.HP_Init).toBe(1);
        expect(abi.AP_Regen).toBe(2);
        expect(abi.AP_Init).toBe(3);
        expect(abi.Exp).toBe(4);
    })
})