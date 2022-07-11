import { Combater } from "../Combater"
import { Status } from "./Status"
import { Damage } from "../Damage"
import { EventCode } from "../StatusManager"


export class Status_Invincible extends Status{

    override eventCode = EventCode.BeforeGetDamage;

    constructor(caster: Combater, damage?: Damage,countdown?: number,description?: string,declaration?: string){
        super(caster, damage, countdown, description, declaration);
    }

    override apply(object: Combater): void {
        this.object
    }

    // just do nothing, this status don't bind to owner.
    override activate(eventTrigger: Combater): void {
        return ;
    }
    override remove(): void {

    }
}