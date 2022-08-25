import { Combater } from '../Combater';
import { Status } from './Status';
import { Damage } from '../Damage';
import { EventCode } from '../StatusManager';

export class Status_RoundDamage extends Status {
  override eventCode = EventCode.AfterNewRound;

  constructor(caster: Combater, damage?: Damage, countdown?: number, description?: string, declaration?: string) {
    super(caster, damage, countdown, description, declaration);
  }

  override apply(object: Combater): void {
    this.owner = object;
    object.statusManager._add(this);
  }

  // just do nothing, this status don't bind to owner.
  override activate(eventTrigger: Combater): void {
    this.owner?.arena.logger.log(this.owner, `${this.declaration}`);

    this.owner?.getDamage(this.damage, this.caster);

    this.countdown -= 1;
    if (this.countdown <= 0) {
      this.remove();
    }
    return;
  }

  override remove(): void {
    this.owner?.statusManager._remove(this);
  }
}
