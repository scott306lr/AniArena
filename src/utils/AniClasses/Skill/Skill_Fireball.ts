import { Combater } from '../Combater';
import { Damage, DamageType } from '../Damage';
import { Status_RoundDamage } from '../Status/Status_RoundDamage';
import { Skill } from './Skill';
import { Skill_JSON } from '../Types';
import { LogType } from '../Arena';

export class Skill_Fireball extends Skill {
  constructor(owner: Combater, skill_JSON: Skill_JSON) {
    super(owner, skill_JSON);
  }

  override cast(object: Combater, isCost: boolean): boolean {
    if (this.consume(isCost) === false) {
      return false;
    }

    this.declaration = '$name開始詠唱，射出了一顆小火球';
    const message = this.declaration.replace('$name', this.owner.player.name);
    this.owner.arena.logger.log(this.owner, LogType.attack, message);

    const damage = new Damage(3, DamageType.magic);
    this.owner.dealDamage(damage, object);
    const burn = new Status_RoundDamage(
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
