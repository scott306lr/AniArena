import { Combater } from '../Combater';
import { Skill_JSON } from '../Types';
import { Skill } from './Skill';
import { Damage, DamageType } from '../Damage';
import { Status_Damage } from '../Status/Status_Damage';
import { LogType } from '../Arena';

export class Skill_Meteor extends Skill {
  constructor(owner: Combater, skill_JSON: Skill_JSON) {
    super(owner, skill_JSON);
  }

  override cast(object: Combater, isCost: boolean): boolean {
    if (this.consume(isCost) === false) {
      return false;
    }

    const name = this.owner.player.name;
    this.declaration = `${name}的劍發出流星光芒☄️`;
    this.owner.arena.logger.log(this.owner, LogType.attack, this.declaration);

    const value = 3 + Math.round(Math.random() * 3);
    const damage = new Damage(value, DamageType.physical);
    const status = new Status_Damage(this.owner, damage);
    status.apply(object);
    return true;
  }
}
