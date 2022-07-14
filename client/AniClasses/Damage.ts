export enum DamageType{
    physical,
    mental,
    magic
}

export class Damage{
    value: number;
    type: DamageType;

    constructor(value: number, type: DamageType){
        if(value < 0){
            value = 0;
        }
        this.value = value;
        this.type = type;
    }

    clone(): Damage {
        return new Damage(this.value, this.type);
    }

    getString(){
        let chineseType: string | undefined;
        if      (this.type === DamageType.magic)    { chineseType = "魔法"; }
        else if (this.type === DamageType.physical) { chineseType = "物理"; }
        else if (this.type === DamageType.mental)   { chineseType = "精神"; }
        return `${this.value}點${chineseType}傷害`;
    }

}