import { Combater } from "../Combater"
import { Status } from "./Status"
import { Damage } from "../Damage"
import { EventCode } from "../StatusManager"


export class Status_Damage extends Status{
    constructor(caster: Combater, damage?: Damage,countdown?: number,description?: string,declaration?: string){
        super(caster, damage, countdown, description, declaration);
    }

    override eventCode = EventCode.Once;

    override apply(object: Combater): void {
        this.owner = object;
        this.owner.getDamage(this.damage, this.caster);
    }


    // just do nothing, this status don't bind to owner.
    override activate(eventTrigger: Combater): void {
        return ;
    }
    override remove(): void {
        return ;
    }


}