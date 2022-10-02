import { Combater } from '../Combater';
import { Skill_JSON } from '../Types';
import { Skill } from './Skill';
import { Damage, DamageType } from '../Damage';
import { Status_Damage } from '../Status/Status_Damage';
import { LogType } from '../Arena';

export class Skill_FuriousStab extends Skill {
  constructor(owner: Combater, skill_JSON: Skill_JSON) {
    super(owner, skill_JSON);
  }

  override cast(object: Combater, isCost: boolean): boolean {
    if (this.consume(isCost) === false) {
      return false;
    }

    const name = this.owner.player.name;
    const objectName = object.player.name;
    this.declaration = `${name}憤怒的突刺(／‵Д′)つ¤=[]————`;
    this.owner.arena.logger.log(this.owner, LogType.attack, this.declaration);

    let loseHP = this.owner.attr.maxHP.get() - this.owner.attr.HP.get();
    let value = 2.5 + loseHP * 0.4;
    const damage = new Damage(value, DamageType.physical);
    const status = new Status_Damage(this.owner, damage);
    status.apply(object);

    return true;
  }
}
