import Skill from "./AniClasses/Skill";

describe('Abilities', () => {
    it('constructor', () => {
        let id = 'user';
        let name = id;
        let type = 'Attack';
        let dsp = '$name Attack!';
        let atk = 10;
        let def = 5;
        let ap_cost = 3;
        let skill = new Skill(id, name, type, dsp, atk, def, ap_cost);
        expect(skill.ID).toBe(id);
        expect(skill.Name).toBe(name);
        expect(skill.Type).toBe(type);
        expect(skill.Description).toBe(dsp);
        expect(skill.ATK_Val).toBe(atk);
        expect(skill.DEF_Val).toBe(def);
        expect(skill.AP_Cost).toBe(ap_cost);
    })

    it.todo('valid type(Attack,React), and check datatype of each argument');
})