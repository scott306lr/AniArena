import { Combater } from "../Combater";
import { Damage, DamageType } from "../Damage";
import { StatusLoader } from "../Status/StatusLoader";
import { Status_Damage } from "../Status/Status_Damage";
import { Status_RoundDamage } from "../Status/Status_RoundDamage";
import { EventCode } from "../StatusManager";
import { Skill } from "./Skill";

export class Skill_Fireball extends Skill{
    constructor(owner: Combater){
        super(owner);
    }

    override cast(object: Combater, isCost: boolean): boolean {

    }
}