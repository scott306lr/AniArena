import { Combater } from "../Combater"
import { Status } from "./Status"
import { Damage } from "../Damage"
import { EventCode } from "../EventHandler"


export class Status_Invincivle extends Status{

    override eventCode = EventCode.BeforeGetDamage;

    override apply(object: Combater): void {

    }

    // just do nothing, this status don't bind to owner.
    override activate(eventTrigger: Combater): void {
        return ;
    }
    override remove(): void {

    }
}