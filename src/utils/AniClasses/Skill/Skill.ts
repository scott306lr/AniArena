import { Skill_Fireball } from "./Skill_Fireball";
import { Combater } from "../Combater";
import { Status } from "../Status/Status"
import { Tag } from "../Tag";

export type Cost = {
    HP: number;
    AP: number;
}

export type Requirement = {
    level: number;
}


export type Skill_JSON = {
    name: string;
    image: string
    description: string;
    declaration: string; 
    tags: Tag[];
    cost: Cost;
    requirement: Requirement;
}


export abstract class Skill{
    owner: Combater;
    dataJSON: Skill_JSON;
    description: string;
    declaration: string;
    cost: Cost;
    requirement: Requirement;  
    name: string;

    constructor(owner: Combater){
        this.owner = owner;
        this.name = this.constructor.name;
        this.dataJSON = this.fetch(this.name);
        this.description = this.dataJSON.description;
        this.declaration = this.dataJSON.declaration;
        this.cost = this.dataJSON.cost;
        this.requirement = this.dataJSON.requirement;
    }

    fetch(name: string): Skill_JSON{
        // use stub or override it to test temporarily until database is online.
        let ret:Skill_JSON = {
            name: 'name',
            image: 'image',
            description: 'description',
            declaration: 'declaration', 
            tags: [Tag.mental],
            cost: {
                HP: 0,
                AP: 5
            },
            requirement: {
                level: 1
            }
        }
        return ret;
    }

    // override if need
    isCastable(isCost: boolean = true): boolean {
        for(let key in this.requirement){
            if(key === "level"){
                let level = this.owner.attribute.level.get();
                if(level < this.requirement[key]){
                    return false;
                }
            }
        }


        if(isCost === false){
            return true;
        }
        for(let key in this.cost){
            if(key === "HP"){
                let HP = this.owner.attribute.HP.get();
                if(HP < this.cost.HP){
                    return false;
                }
            }
            else if(key === "AP"){
                let AP = this.owner.attribute.AP.get();
                if(AP < this.cost.AP){
                    return false;
                }
            }
        }
        return true;
    }


    /**
     * This function first check if combater
     * @param object target combater.
     * @param isCost if true, combater needs to pay attribute to cast spell. 
     */
    abstract cast(object: Combater, isCost: boolean): boolean;

    
    /**
     * cast helper, override if needs.
     * @param isCost if true, combater needs to pay attribute to cast spell. 
     */
    protected consume(isCost: boolean = true): boolean{
        if(this.isCastable(isCost) === false){
            return false;
        }

        if(isCost){
            for(let key in this.cost){
                if(key === "HP"){
                    this.owner.loseHP(this.cost.HP, null);
                }
                else if(key === "AP"){
                    this.owner.loseAP(this.cost.AP, null);
                }
            }
        }

        return true;
    }
}