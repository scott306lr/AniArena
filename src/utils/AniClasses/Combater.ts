import { Damage, DamageType } from "./Damage";
import { Character_JSON, Skill_JSON } from "./Types"
import { Attribute, AttributeState } from "./Attribute";
import { Player_JSON } from "./Types";
import { Skill } from "./Skill/Skill";
import { Arena, CombaterState } from "./Arena";
import { EventCode, StatusManager } from "./StatusManager";
import { getRandomElement } from "./utils";
import { SkillLoader } from "./Skill/SkillLoader";


export class Combater{
    player: Player_JSON;
    private character: Character_JSON;
    attribute: Attribute;
    skills: Skill[];
    nextSkill: Skill | null;
    statusManager: StatusManager;
    arena: Arena;
    damage: Damage;
    

    constructor(player_JSON: Player_JSON, arena: Arena){
        this.player = JSON.parse(JSON.stringify(player_JSON));
        this.character = this.player.combater.character;
        this.attribute = new Attribute(this.player.combater.attr);
        this.statusManager = new StatusManager(this);
        
        this.skills = [];
        this.character.skills.forEach(skillName => this.loadSkill(skillName));
        this.arena = arena;
        this.nextSkill = this.chooseSkill();
        this.damage = new Damage(0, DamageType.physical);
    }

    reset(player_JSON: Player_JSON | null = null){
        if(player_JSON !== null){
            this.player = JSON.parse(JSON.stringify(player_JSON));
        }
        this.character = this.player.combater.character;
        this.attribute = new Attribute(this.player.combater.attr);
        this.statusManager = new StatusManager(this);

        this.skills = [];
        this.character.skills.forEach(skillName => this.loadSkill(skillName));
        // this.arena = arena;
    }

    interrupt(){

    }

    newRound(){
        this.getAP(this.attribute.APRegen.get(), this);
        this.statusManager.trigger(EventCode.AfterNewRound, null);
        this.chooseSkill();
    }

    loadSkill(skill_JSON: Skill_JSON): boolean{
        let skill = SkillLoader(this, skill_JSON);
        if (skill === undefined) return false;
        this.skills.push(skill);
        return true;
    }

    castSkill(object: Combater): boolean{
        if (this.nextSkill === null || !this.nextSkill?.isCastable()) return false;

        this.statusManager.trigger(EventCode.BeforeCastSkill, this);
        this.nextSkill.cast(object, true);
        this.statusManager.trigger(EventCode.AfterCastSkill, this);
        return true;
    }

    chooseSkill(): Skill | null {
        const RequirementFilter = (item: Skill, index: number, array: Skill[]) => { return item.isCastable(false);}
        const meetSkills = this.skills.filter(RequirementFilter);

        const randomSkill = getRandomElement(meetSkills);
        if (!randomSkill) return null

        this.nextSkill = randomSkill;
        return this.nextSkill;
    }

    getPriority(): number {
        if (!this.nextSkill) return Infinity;
        return this.nextSkill?.dataJSON.cost.AP;
    }

    isReady(): boolean{
        if(!this.nextSkill) return false;
        return this.nextSkill.isCastable();
    }


    // damage: Damage | null;

    dealDamage(damage: Damage, object: Combater): boolean{
        this.damage = damage.clone();
        this.statusManager.trigger(EventCode.BeforeDealDamage, this);

        object.getDamage(this.damage, this);

        this.statusManager.trigger(EventCode.AfterDealDamage, this);
        return true;
    }
    
    getDamage(damage: Damage, source: Combater | null): boolean{
        this.damage = damage.clone();
        this.statusManager.trigger(EventCode.BeforeGetDamage, source);

        this.loseHP(this.damage.value, null);
        this.arena.logger.log(this, `${this.player.name}受到${this.damage.getString()}`)
        
        this.statusManager.trigger(EventCode.AfterLoseHP, source);

        return true;
    }

    loseHP(value : number, caller: Combater | null): boolean{
        if(value < 0){
            return false;
        }
        this.statusManager.trigger(EventCode.BeforeLoseHP, caller);

        let currentHP = this.attribute.HP.get();
        let newHP = Math.max(currentHP - value, 0);
        this.attribute.HP.set(newHP);

        this.statusManager.trigger(EventCode.AfterLoseHP, caller);
        return true;
    }

    getHP(value : number, caller: Combater): boolean{
        if(value < 0){
            return false;
        }
        this.statusManager.trigger(EventCode.BeforeGetHP, caller);
        
        let currentHP = this.attribute.HP.get();
        let currentMaxHP = this.attribute.maxHP.get();
        let newHP = Math.min(currentHP + value, currentMaxHP);
        this.attribute.HP.set(newHP);

        this.statusManager.trigger(EventCode.AfterGetHP, caller);
        return true;
    }

    loseAP(value : number, caller: Combater | null): boolean{
        if(value < 0){
            return false;
        }
        this.statusManager.trigger(EventCode.BeforeLoseAP, caller);

        let currentAP = this.attribute.AP.get();
        let newAP = Math.max(currentAP - value, 0);
        this.attribute.AP.set(newAP);

        this.statusManager.trigger(EventCode.AfterLoseAP, caller);
        return true;

    }

    getAP(value: number, caller: Combater | null): boolean{
        if(value < 0){
            return false;
        }

        this.statusManager.trigger(EventCode.BeforeGetAP, caller);
        let currentAP = this.attribute.AP.get();
        let currentMaxAP = this.attribute.maxAP.get();
        let newAP = Math.min(currentAP + value, currentMaxAP);
        this.attribute.AP.set(newAP);
        this.statusManager.trigger(EventCode.AfterGetAP, caller);
        return true;
    }

    

    /**
     * Return Combater inner state information (return by copy not by reference),
     * such as player nickname, character, attribute, and status in json convertable format.
     * @returns CombaterState
     */
    getCombaterState(): CombaterState{
        let attributeStatue: AttributeState = this.attribute.get();
        let ret: CombaterState = {
            nickname:  this.player.name.slice(),
            character: JSON.parse(JSON.stringify(this.character)),
            attribute: attributeStatue,
            status: this.statusManager.get(),
        }
        return ret;
    }


}