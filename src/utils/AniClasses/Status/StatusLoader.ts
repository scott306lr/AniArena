import { Status } from "./Status";
import { Combater } from "../Combater";
import { Damage } from "../Damage";
import { Status_Damage } from "./Status_Damage";
import { Status_Invincible } from "./Status_Invincible";
import { Status_RoundDamage } from "./Status_RoundDamage";

export enum StatusName{
    Status_Damage,
    Status_Invincivle,
    Status_RoundDamage,
}

export function StatusLoader(name: string,
                             caster: Combater,
                             owner?: Combater,
                             damage?: Damage,
                             countdown?: number, 
                             description?: string,
                             declaration?: string): Status | undefined
{

    // if skill use inheritance, it's not nacessary to use this function.
    // if skill is customized, this may help.
    switch(name){
        case "Status_Damage":       { return new Status_Damage(caster, owner, damage, countdown, description, declaration); }
        case "Status_Invincible":   { return new Status_Invincible(caster, owner, damage, countdown, description, declaration); }
        case "Status_RoundDamage":  { return new Status_RoundDamage(caster, owner, damage, countdown, description, declaration); }
        default: { return undefined; }
    }



}