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
        if(this.countdown == undefined){
            this.countdown = 1;
        }
        this.owner = object;
        object.statusManager._add(this);
    }

    override activate(eventTrigger: Combater): void {
        this.owner?.arena.logger.log(this.owner, "無敵效果發動！");

        if(this.owner?.damage !== undefined){
            this.owner.damage.value = 0;
        }
        this.countdown-=1;

        if(this.countdown <= 0){
            this.remove();
        }

        return ;
    }
    override remove(): void {
        this.owner?.statusManager._remove(this);
    }
}