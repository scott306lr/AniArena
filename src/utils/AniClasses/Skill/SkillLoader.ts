import { Combater } from "../Combater";
import { Skill } from "./Skill";
import { Skill_Fireball } from "./Skill_Fireball";
import { Skill_NormalAttack } from "./Skill_NormalAttack";

export function SkillLoader(owner: Combater, skillName: string): Skill | undefined{
    // I can't find any feasible and smart method, so...

    switch(skillName) {
        case "Skill_NormalAttack": {return new Skill_NormalAttack(owner); }
        case "Skill_Fireball": { return new Skill_Fireball(owner); }
        default: {return undefined; }
    }

}