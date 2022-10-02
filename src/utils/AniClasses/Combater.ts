import { Damage, DamageType } from './Damage';
import { Attribute_JSON, Character_JSON, Skill_JSON } from './Types';
import { Attribute, AttributeState } from './Attribute';
import { Player_JSON } from './Types';
import { Skill } from './Skill/Skill';
import { Arena, CombaterState, LogType } from './Arena';
import { EventCode, StatusManager } from './StatusManager';
import { getRandomElement } from './utils';
import { SkillLoader } from './Skill/SkillLoader';

export class Combater {
  player: Player_JSON;
  private character: Character_JSON;
  attr: Attribute;
  skills: Skill[];
  nextSkill: Skill | null;
  statusManager: StatusManager;
  arena: Arena;
  damage: Damage;

  constructor(player_JSON: Player_JSON, arena: Arena) {
    this.player = JSON.parse(JSON.stringify(player_JSON));
    if (this.player.combater == null) {
      throw 'combater is null or undefined!';
    }
    this.character = this.player.combater.character;
    this.attr = new Attribute(this.player.combater.attr as Attribute_JSON);
    this.statusManager = new StatusManager(this);

    this.skills = [];
    this.character.skills.forEach((skillName) => this.loadSkill(skillName));
    this.arena = arena;
    this.nextSkill = this.chooseSkill();
    this.damage = new Damage(0, DamageType.physical);
  }

  reset(player_JSON: Player_JSON | null = null) {
    if (player_JSON !== null) {
      this.player = JSON.parse(JSON.stringify(player_JSON));
    }
    if (this.player.combater == null) {
      throw 'combater is null or undefined!';
    }
    this.character = this.player.combater.character;
    this.attr = new Attribute(this.player.combater.attr as Attribute_JSON);
    this.statusManager = new StatusManager(this);

    this.skills = [];
    this.character.skills.forEach((skillName) => this.loadSkill(skillName));
    // this.arena = arena;
  }

  // interrupt() {}

  newRound() {
    this.getAP(this.attr.APRegen.get(), this);
    this.statusManager.trigger(EventCode.AfterNewRound, null);
    this.chooseSkill();
  }

  loadSkill(skill_JSON: Skill_JSON): boolean {
    const skill = SkillLoader(this, skill_JSON);
    if (skill === undefined) return false;
    this.skills.push(skill);
    return true;
  }

  castSkill(object: Combater): boolean {
    if (this.nextSkill === null || !this.nextSkill?.isCastable()) return false;

    this.statusManager.trigger(EventCode.BeforeCastSkill, this);
    this.nextSkill.cast(object, true);
    this.statusManager.trigger(EventCode.AfterCastSkill, this);
    return true;
  }

  chooseSkill(): Skill | null {
    const RequirementFilter = (item: Skill) => {
      return item.isCastable(false);
    };
    const meetSkills = this.skills.filter(RequirementFilter);

    const randomSkill = getRandomElement(meetSkills);
    if (!randomSkill) return null;

    this.nextSkill = randomSkill;
    return this.nextSkill;
  }

  getPriority(): number {
    if (this.nextSkill == null || this.nextSkill.cost.AP == null) return Infinity;
    return this.nextSkill?.cost.AP;
  }

  isReady(): boolean {
    if (!this.nextSkill) return false;
    return this.nextSkill.isCastable();
  }

  // damage: Damage | null;

  dealDamage(damage: Damage, object: Combater): boolean {
    this.damage = damage.clone();
    this.statusManager.trigger(EventCode.BeforeDealDamage, this);

    object.getDamage(this.damage, this);

    this.statusManager.trigger(EventCode.AfterDealDamage, this);
    return true;
  }

  getDamage(damage: Damage, source: Combater | null): boolean {
    this.damage = damage.clone();
    this.statusManager.trigger(EventCode.BeforeGetDamage, source);

    this.loseHP(this.damage.value, null);
    this.arena.logger.log(this, LogType.hurt, `${this.player.name}受到${this.damage.getString()}`);

    this.statusManager.trigger(EventCode.AfterLoseHP, source);

    return true;
  }

  loseHP(value: number, caller: Combater | null): boolean {
    if (value < 0) {
      return false;
    }
    this.statusManager.trigger(EventCode.BeforeLoseHP, caller);

    const currentHP = this.attr.HP.get();
    const newHP = Math.max(currentHP - value, 0);
    this.attr.HP.set(newHP);

    this.statusManager.trigger(EventCode.AfterLoseHP, caller);
    return true;
  }

  getHP(value: number, caller: Combater): boolean {
    if (value < 0) {
      return false;
    }
    this.statusManager.trigger(EventCode.BeforeGetHP, caller);

    const currentHP = this.attr.HP.get();
    const currentMaxHP = this.attr.maxHP.get();
    const newHP = Math.min(currentHP + value, currentMaxHP);
    this.attr.HP.set(newHP);

    this.statusManager.trigger(EventCode.AfterGetHP, caller);
    return true;
  }

  loseAP(value: number, caller: Combater | null): boolean {
    if (value < 0) {
      return false;
    }
    this.statusManager.trigger(EventCode.BeforeLoseAP, caller);

    const currentAP = this.attr.AP.get();
    const newAP = Math.max(currentAP - value, 0);
    this.attr.AP.set(newAP);

    this.statusManager.trigger(EventCode.AfterLoseAP, caller);
    return true;
  }

  getAP(value: number, caller: Combater | null): boolean {
    if (value < 0) {
      return false;
    }

    this.statusManager.trigger(EventCode.BeforeGetAP, caller);
    const currentAP = this.attr.AP.get();
    const currentMaxAP = this.attr.maxAP.get();
    const newAP = Math.min(currentAP + value, currentMaxAP);
    this.attr.AP.set(newAP);
    this.statusManager.trigger(EventCode.AfterGetAP, caller);
    return true;
  }

  /**
   * Return Combater inner state information (return by copy not by reference),
   * such as player nickname, character, attribute, and status in json convertable format.
   * @returns CombaterState
   */
  getCombaterState(): CombaterState {
    const attributeState: AttributeState = this.attr.get();
    const ret: CombaterState = {
      id: this.player.id,
      name: this.player.name.slice(),
      character: JSON.parse(JSON.stringify(this.character)),
      attr: attributeState,
      status: this.statusManager.get(),
    };
    return ret;
  }
}
