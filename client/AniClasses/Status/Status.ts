import { Combater } from "../Combater";
import { Damage, DamageType } from "../Damage";
import { Tag } from "../Tag";
import { EventCode } from "../EventHandler"

export type Status_JSON = {
    name: string;
    image: string;
    description: string;
    declaration: string;
    tags : Tag[];
}


export abstract class Status{
    caster: Combater;
    owner: Combater | undefined;
    damage: Damage = new Damage(1, DamageType.physical);
    countdown: number | undefined;

    dataJson: Status_JSON;
    description: string | undefined;
    declaration: string | undefined;
    tags: Tag[];

    exited = 0;
    

    name: string;
    // Set these varaible when you inherit it.
    abstract eventCode: EventCode;
    

    constructor(caster: Combater,
                owner?: Combater,
                damage?: Damage,
                countdown?: number,
                description?: string,
                declaration?: string)
    {
        this.caster = caster;
        this.owner = owner;

        this.damage = (damage === undefined)? this.damage: damage.clone();
        this.countdown = countdown;
        this.description = description;
        this.declaration = declaration;

        console.log(this.constructor.name);
        this.name = this.constructor.name;
        
        this.dataJson = this.fetch(this.name);
        this.description = (this.description === undefined)? this.dataJson.description: this.description;
        this.declaration = (this.declaration === undefined)? this.dataJson.declaration: this.declaration;
        this.tags = this.dataJson.tags;
    }

    /**
     * fetch database data
     */
    fetch(name: string): Status_JSON{
        console.log('temporily use stub simulate fetch data from database');
        let ret: Status_JSON = {
            name: 'name',
            image: 'image',
            description: 'description',
            declaration: 'declaration',
            tags: [Tag.buff, Tag.physical]
        }
        return ret;
    }

    /**
     * apply status to owner
     * if the status is not instance, add the status to owner's list.
     * @param object 
     */
    abstract apply(object: Combater): void;

    /**
     * Activate status if trigger pass some conditions.
     * @param eventTrigger who trigger this status
     */
    abstract activate(eventTrigger: Combater): void;
    
    
    /**
     * exit function, execute when the status is going to be remove from owner.
     * remove temporarily change on combater in this function.
     * remember to set exited to true;
     */
    abstract remove(): void;

    /**
     * Check if incoming event satisfies activation condition, if pass, activate status.
     * Override if needs.
     * @param eventCode 
     * @param eventTrigger 
     */
    trigger(eventCode: EventCode, eventTrigger: Combater){
        if(eventCode == this.eventCode){
            this.activate(eventTrigger);
        }
    }
}