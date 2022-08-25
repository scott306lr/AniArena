import { Combater } from '../Combater';
import { Skill_JSON } from '../Types';
import { Skill } from './Skill';
import { Tag } from '../Tag';
import { Damage, DamageType } from '../Damage';
import { Status_Damage } from '../Status/Status_Damage';

export class Skill_NormalAttack extends Skill {
  constructor(owner: Combater, skill_JSON: Skill_JSON) {
    super(owner, skill_JSON);
  }

  // override fetch(name: string): Skill_JSON{
  //     // use stub or override it to test temporarily until database is online.
  //     let ret:Skill_JSON = {
  //         name: '普通攻擊',
  //         image: 'image',
  //         description: '對敵人造成普通程度的物理傷害',
  //         declaration: '$name撿起石頭砸向$object',
  //         tags: [Tag.physical],
  //         cost: {
  //             HP: 0,
  //             AP: 3,
  //         },
  //         requirement: {
  //             level: 0
  //         }
  //     }
  //     return ret;
  // }

  override cast(object: Combater, isCost: boolean): boolean {
    if (this.consume(isCost) === false) {
      return false;
    }
    this.declaration = '$name撿起石頭砸向$object';
    let name = this.owner.player.name;
    let objectName = object.player.name;
    let message = this.declaration.replace('$name', name).replace('$object', objectName);
    this.owner.arena.logger.log(this.owner, message);

    let damage = new Damage(3, DamageType.physical);
    let status = new Status_Damage(this.owner, damage);
    status.apply(object);

    return true;
  }
}
