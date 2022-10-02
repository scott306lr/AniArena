import { Combater } from '../Combater';
import { Skill_JSON } from '../Types';
import { Skill } from './Skill';
import { Skill_Fireball } from './Skill_Fireball';
import { Skill_NormalAttack } from './Skill_NormalAttack';
import { Skill_SingleSlash } from './Skill_SingleSlash';

export function SkillLoader(owner: Combater, skill_JSON: Skill_JSON): Skill | undefined {
  switch (skill_JSON.name) {
    case '火球術':
      return new Skill_Fireball(owner, skill_JSON);
    case '普通攻擊':
      return new Skill_NormalAttack(owner, skill_JSON);
    case '斜斬':
      return new Skill_SingleSlash(owner, skill_JSON);
    default:
      return undefined;
  }
}
