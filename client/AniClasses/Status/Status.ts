import { Combater } from "../Combater";
import { Damage, DamageType } from "../Damage";
import { Tag } from "../Tag";
import { EventCode } from "../StatusManager"
import { clone } from "lodash";

export type Status_JSON = {
    name: string;
    image: string;
    description: string;
    declaration: string;
    tags : Tag[];
}

export type StatusState = {
    name: string,
    image: string,
    countdown: number | undefined,
    description: string | undefined,
    tags: Tag[]
}


export abstract class Status{
    caster: Combater;
    owner: Combater | undefined;
    damage: Damage = new Damage(1, DamageType.physical);
    countdown: number;

    dataJson: Status_JSON;
    description: string | undefined;
    declaration: string | undefined;
    tags: Tag[];

    exited = 0;
    

    name: string;
    // Set these varaible when you inherit it.
    abstract eventCode: EventCode;
    

    constructor(caster: Combater, damage?: Damage, countdown: number = 0, description?: string, declaration?: string)
    {
        this.caster = caster;

        this.damage = (damage === undefined)? this.damage: damage.clone();
        this.countdown = countdown;
        this.description = description;
        this.declaration = declaration;

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
        // console.log('temporily use stub simulate fetch data from database');
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
    abstract activate(eventTrigger: Combater | undefined): void;
    
    
    /**
     * exit function, execute when the status is going to be remove from owner.
     * remove temporarily change on combater in this function.
     */
    abstract remove(): void;

    /**
     * Check if incoming event satisfies activation condition, if pass, activate status.
     * Override if needs.
     * @param eventCode 
     * @param eventTrigger 
     */
    trigger(eventCode: EventCode, eventTrigger: Combater | undefined){
        if(eventCode == this.eventCode){
            this.activate(eventTrigger);
        }
    }

    /**
     * Return Status inner state information, eg name,
     * description, imagelink, tags, and countdown
     */
    get(): StatusState{
        let ret: StatusState = {
            name: this.name,
            image: this.dataJson.image,
            countdown: this.countdown,
            description: this.description,
            tags: clone(this.tags)
        }
        return ret;

    }
}