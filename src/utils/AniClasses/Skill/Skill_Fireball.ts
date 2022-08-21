import { Combater } from "../Combater";
import { Damage, DamageType } from "../Damage";
import { StatusLoader } from "../Status/StatusLoader";
import { Status_Damage } from "../Status/Status_Damage";
import { Status_RoundDamage } from "../Status/Status_RoundDamage";
import { EventCode } from "../StatusManager";
import { Skill, Skill_JSON } from "./Skill";
import { Tag } from "../Tag";

export class Skill_Fireball extends Skill{
    constructor(owner: Combater){
        super(owner);
    }

    override fetch(name: string): Skill_JSON{
        // use stub or override it to test temporarily until database is online.
        let ret:Skill_JSON = {
            name: '火球術',
            image: 'image',
            description: '儘管是最基礎的攻擊魔法，也要耗費三十年習得',
            declaration: '$name開始詠唱\，射出了一顆小火球', 
            tags: [Tag.magic],
            cost: {
                HP: 0,
                AP: 5
            },
            requirement: {
                level: 0
            }
        }
        return ret;
    }

    override cast(object: Combater, isCost: boolean): boolean {
        if(this.consume(isCost) === false){
            return false;
        }

        let message = this.declaration.replace("$name", this.owner.player.nickname);
        this.owner.arena.logger.log(this.owner, message);

        let damage = new Damage(3, DamageType.magic);
        this.owner.dealDamage(damage, object);
        let burn = new Status_RoundDamage(this.owner, new Damage(1, DamageType.magic), 1, "灼傷", `${object.player.nickname}身體被灼傷了`);
        burn.apply(object);

        return true;
    }
}