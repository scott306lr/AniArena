import { Combater } from '../Combater';
import { Skill_JSON } from '../Types';

export type Cost = {
  HP?: number;
  AP?: number;
};

export type Requirement = {
  level?: number;
  AP?: number;
};

export abstract class Skill {
  owner: Combater;
  dataJSON: Skill_JSON;
  description: string;
  declaration?: string;
  cost: Cost;
  requirement: Requirement;
  name: string;

  constructor(owner: Combater, skill_JSON: Skill_JSON) {
    this.owner = owner;
    this.name = this.constructor.name;
    this.dataJSON = JSON.parse(JSON.stringify(skill_JSON));
    this.description = this.dataJSON.description as string;
    this.cost = this.dataJSON.cost as Cost;
    this.requirement = this.dataJSON.requirement as Requirement;
  }

  // override if need
  isCastable(isCost = true): boolean {
    for (const key in this.requirement) {
      if (key === 'level') {
        const level = this.owner.attr.level.get();
        if (this.requirement.level != undefined && level < this.requirement.level) {
          return false;
        }
      } else if (key === 'AP') {
        const AP = this.owner.attr.AP.get();
        if (this.requirement.AP != undefined && AP < this.requirement.AP) {
          return false;
        }
      }
    }

    if (isCost === false) {
      return true;
    }
    for (const key in this.cost) {
      if (key === 'HP') {
        const HP = this.owner.attr.HP.get();
        if (this.cost.HP !== undefined && HP < this.cost.HP) {
          return false;
        }
      } else if (key === 'AP') {
        const AP = this.owner.attr.AP.get();
        if (this.cost.AP !== undefined && AP < this.cost.AP) {
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
  protected consume(isCost = true): boolean {
    if (this.isCastable(isCost) === false) {
      return false;
    }

    if (isCost) {
      for (const key in this.cost) {
        if (key === 'HP' && this.cost.HP !== undefined) {
          this.owner.loseHP(this.cost.HP, null);
        } else if (key === 'AP' && this.cost.AP !== undefined) {
          this.owner.loseAP(this.cost.AP, null);
        }
      }
    }

    return true;
  }
}
