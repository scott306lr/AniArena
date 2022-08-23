import { Attribute_JSON } from "./Types";

export type AttributeState = {
    level: number;
    exp: number;
    HP: number;
    maxHP: number;
    AP: number;
    maxAP: number;
    APRegen: number;
}

export class IntAttribute{
    private value: number;
    constructor(value: number){
        this.value = Math.round(value);
    }

    public get():number {
        return this.value;
    }

    public set(value: number):void {
        this.value = Math.round(value);
    }
}


export class Attribute{
    jsonData: Attribute_JSON;
    level: IntAttribute;
    exp: IntAttribute;
    HP: IntAttribute;
    maxHP: IntAttribute;
    AP: IntAttribute;
    maxAP: IntAttribute;
    APRegen: IntAttribute;

    constructor(attribute_JSON: Attribute_JSON){
        this.jsonData = JSON.parse(JSON.stringify(attribute_JSON));
        this.level   = new IntAttribute(this.jsonData.level);
        this.exp     = new IntAttribute(this.jsonData.exp);
        this.HP      = new IntAttribute(this.jsonData.HP);
        this.maxHP   = new IntAttribute(this.jsonData.HP);
        this.AP      = new IntAttribute(this.jsonData.AP);
        this.maxAP   = new IntAttribute(this.jsonData.AP);
        this.APRegen = new IntAttribute(this.jsonData.APRegen);
    }

    reset(attribute_JSON?: Attribute_JSON):void {
        if(attribute_JSON != undefined){
            this.jsonData = JSON.parse(JSON.stringify(attribute_JSON));
        }
        this.level   = new IntAttribute(this.jsonData.level);
        this.exp     = new IntAttribute(this.jsonData.exp);
        this.HP      = new IntAttribute(this.jsonData.HP);
        this.maxHP   = new IntAttribute(this.jsonData.HP);
        this.AP      = new IntAttribute(this.jsonData.AP);
        this.maxAP   = new IntAttribute(this.jsonData.AP);
        this.APRegen = new IntAttribute(this.jsonData.APRegen);
    }

    get(): AttributeState{
        let ret: AttributeState = {
            level:      this.level.get(),
            exp:        this.exp.get(),
            HP:         this.HP.get(),
            maxHP:      this.maxHP.get(),
            AP:         this.AP.get(),
            maxAP:      this.maxAP.get(),
            APRegen:    this.APRegen.get(),
        }
        return ret;
    }

}
