import { Combater } from '../Combater';
import { Damage, DamageType } from '../Damage';
import { Status_RoundDamage } from '../Status/Status_RoundDamage';
import { Skill } from './Skill';
import { Skill_JSON } from '../Types';
import { LogType } from '../Arena';

// export class Skill_Explosion extends Skill {
//   constructor(owner: Combater, skill_JSON: Skill_JSON) {
//     super(owner, skill_JSON);
//   }

//   override cast(object: Combater, isCost: boolean): boolean {

//   }
// }

export class Skill_Explosion extends Skill {
  constructor(owner: Combater, skill_JSON: Skill_JSON) {
    super(owner, skill_JSON);
  }

  override cast(object: Combater, isCost: boolean): boolean {
    if (this.consume(isCost) === false) {
      return false;
    }

    this.declaration = `${this.owner.player.name}(∩ゝ∀･)⊃━☆ﾟ.*･｡`;
    this.owner.arena.logger.log(this.owner, LogType.attack, this.declaration);
    this.owner.arena.logger.log(this.owner, LogType.attack, '比黑色還要黑 暗之漆黑');
    this.owner.arena.logger.log(this.owner, LogType.attack, '融合著我之真紅吧');
    this.owner.arena.logger.log(this.owner, LogType.attack, '覺醒的時刻已經到來');
    this.owner.arena.logger.log(this.owner, LogType.attack, '墜入無謬之境界');
    this.owner.arena.logger.log(this.owner, LogType.attack, '形成無形之扭曲');
    this.owner.arena.logger.log(this.owner, LogType.attack, '出現吧！');
    this.owner.arena.logger.log(this.owner, LogType.attack, 'EXPLOSION!～★');

    let scalar = 1;
    for (let i = 0; i < Math.max(2, this.owner.attr.level.get()); ++i) scalar += Math.floor(6 * Math.random());

    const damage = new Damage((this.owner.attr.maxAP.get() / 4) * scalar, DamageType.magic);

    const burn = new Status_RoundDamage(
      this.owner,
      new Damage(object.attr.maxHP.get() * 0.18, DamageType.magic),
      1,
      '灼傷',
      `${object.player.name}身體被灼傷了`
    );
    this.owner.dealDamage(damage, object);
    burn.apply(object);

    this.owner.arena.logger.log(this.owner, LogType.effected, `${this.owner.player.name}癱倒在地_(:3 」∠ )_`);
    this.owner.loseAP(this.owner.attr.maxAP.get(), null);
    this.owner.getDamage(new Damage(this.owner.attr.HP.get() * 0.9, DamageType.mental), null);
    return true;
  }
}
