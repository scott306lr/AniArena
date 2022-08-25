import { Combater } from '../Combater';
import { Damage, DamageType } from '../Damage';
import { StatusLoader } from '../Status/StatusLoader';
import { Status_Damage } from '../Status/Status_Damage';
import { Status_RoundDamage } from '../Status/Status_RoundDamage';
import { EventCode } from '../StatusManager';
import { Skill } from './Skill';
import { Tag } from '../Tag';
import { Skill_JSON } from '../Types';

export class Skill_Fireball extends Skill {
  constructor(owner: Combater, skill_JSON: Skill_JSON) {
    super(owner, skill_JSON);
  }

  override cast(object: Combater, isCost: boolean): boolean {
    if (this.consume(isCost) === false) {
      return false;
    }

    this.declaration = '$name開始詠唱，射出了一顆小火球';
    let message = this.declaration.replace('$name', this.owner.player.name);
    this.owner.arena.logger.log(this.owner, message);

    let damage = new Damage(3, DamageType.magic);
    this.owner.dealDamage(damage, object);
    let burn = new Status_RoundDamage(
      this.owner,
      new Damage(1, DamageType.magic),
      1,
      '灼傷',
      `${object.player.name}身體被灼傷了`
    );
    burn.apply(object);

    return true;
  }
}
