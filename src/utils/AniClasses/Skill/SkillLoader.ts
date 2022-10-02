import { Combater } from '../Combater';
import { Skill_JSON } from '../Types';
import { Skill } from './Skill';
import { Skill_Fireball } from './Skill_Fireball';
import { Skill_NormalAttack } from './Skill_NormalAttack';
import { Skill_SingleSlash } from './Skill_SingleSlash';
import { Skill_Explosion } from './Skill_Explosion';
import { Skill_ParallelStab } from './Skill_ParallelStab';
import { Skill_FuriousStab } from './Skill_FuriousStab';


export function SkillLoader(owner: Combater, skill_JSON: Skill_JSON): Skill | undefined {
  switch (skill_JSON.name) {
    case '火球術':
      return new Skill_Fireball(owner, skill_JSON);
    case '普通攻擊':
      return new Skill_NormalAttack(owner, skill_JSON);
    case '斜斬':
      return new Skill_SingleSlash(owner, skill_JSON);
    case 'EXPLOSION！':
      return new Skill_Explosion(owner, skill_JSON);
    case '憤怒刺擊':
      return new Skill_FuriousStab(owner, skill_JSON);
    case '平行刺擊':
      return new Skill_ParallelStab(owner, skill_JSON);
    default:
      return undefined;
  }
}
