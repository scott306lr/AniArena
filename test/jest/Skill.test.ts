import Skill from "../../client/AniClasses/Skill";

describe('Abilities', () => {
    it('constructor', () => {
        let id = 'user';
        let name = id;
        let type = 'Attack';
        let dsp = '$name Attack!';
        let shoutout = 'Explosion!';
        let ap_cost = 3;
        let states = []
        let skill = new Skill(id, name, dsp, shoutout, ap_cost, states);
        expect(skill.ID).toBe(id);
        expect(skill.Name).toBe(name);
        expect(skill.Description).toBe(dsp);
        expect(skill.AP_Cost).toBe(ap_cost);
    })

    it.todo('valid type(Attack,React), and check datatype of each argument');
})