import { Combater } from '../Combater';
import { Skill_JSON } from '../Types';
import { Skill } from './Skill';
import { Damage, DamageType } from '../Damage';
import { Status_Damage } from '../Status/Status_Damage';
import { LogType } from '../Arena';

export class Skill_SingleSlash extends Skill {
  constructor(owner: Combater, skill_JSON: Skill_JSON) {
    super(owner, skill_JSON);
  }

  override cast(object: Combater, isCost: boolean): boolean {
    if (this.consume(isCost) === false) {
      return false;
    }

    const name = this.owner.player.name;
    const objectName = object.player.name;
    this.declaration = `${name}對${objectName}使用單發斜斬發動突襲！`;
    this.owner.arena.logger.log(this.owner, LogType.attack, this.declaration);
    const damage = new Damage(Math.round(this.owner.attr.maxHP.get() / 10), DamageType.physical);
    const status = new Status_Damage(this.owner, damage);
    status.apply(object);

    return true;
  }
}
