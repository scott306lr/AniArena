import { Player_JSON, Skill_JSON } from '../../src/utils/AniClasses/Types';
import { Combater } from '../../src/utils/AniClasses/Combater';
import { Arena } from '../../src/utils/AniClasses/Arena';
import { EventCode } from '../../src/utils/AniClasses/StatusManager';
import { Damage, DamageType } from '../../src/utils/AniClasses/Damage';

describe('Combater Test', () => {
  let arena: Arena;
  let player1: Player_JSON;
  let player2: Player_JSON;
  let combater_engineer: Combater;
  let combater_bot: Combater;
  let normalAttack: Skill_JSON;

  beforeEach(() => {
    player1 = {
      id: 'cl74noa020210cbvhgy3p1ctx',
      createdAt: new Date('2022-08-22T11:09:10.946Z'),
      updatedAt: new Date('2022-08-22T11:05:49.163Z'),
      userId: 'cl747pr8k0018979tc4k8xj6k',
      name: '測試工程師',
      description: '我是測試工程師',
      combater: {
        id: 'cl74o63wj0020wpvhyekqhcqz',
        createdAt: new Date('2022-08-22T11:23:02.851Z'),
        updatedAt: new Date('2022-08-22T11:16:30.944Z'),
        playerId: 'cl74noa020210cbvhgy3p1ctx',
        characterId: 1,
        character: {
          id: 1,
          createdAt: new Date('2022-08-22T11:09:10.946Z'),
          updatedAt: new Date('2022-08-22T11:05:49.163Z'),
          name: '魔法學徒',
          image: '',
          description: '25歲的母胎單身之人，開始感覺到充沛的魔力湧出。',
          orgAttr: {
            level: 1,
            exp: 0,
            HP: 20,
            AP: 5,
            APRegen: 5,
          },
          skills: [],
        },
        attr: {
          level: 1,
          exp: 0,
          HP: 20,
          AP: 5,
          APRegen: 5,
        },
      },
    };
    player2 = JSON.parse(JSON.stringify(player1));
    player2.name = '機器人';

    normalAttack = {
      id: 1,
      createdAt: new Date('2022-08-22T10:38:38.623Z'),
      updatedAt: new Date('2022-08-22T04:37:59.873Z'),
      name: '普通攻擊',
      image: null,
      description: '對敵人造成普通程度的物理傷害',
      requirement: {
        level: 0,
      },
      cost: {
        AP: 3,
      },
    };

    arena = new Arena(player1, player2);
    combater_engineer = new Combater(player1, arena);
    combater_bot = new Combater(player2, arena);
  });

  // it.todo("Combater.reset() reset all attribute and state");
  it('Combater.reset()', () => {
    player1.description = 'newvalue';
    combater_bot.reset(player1);

    expect(combater_bot.player.description).toBe(player1.description);

    let hp = combater_bot.attr.HP.get();
    combater_bot.loseHP(3, null);
    expect(combater_bot.attr.HP.get()).toBe(hp - 3);
    combater_bot.reset();
    expect(combater_bot.attr.HP.get()).toBe(hp);
  });

  it.todo('Combater.fetchCharacter() get character from database');
  it.todo('Combater.interrupt() tell combater should break current action.');

  // it.todo("Combater.newRound() regenerate AP, chooseSkill, trigger event");
  it('Combater.newRound()', () => {
    combater_bot.loseAP(10, null);

    let ap = combater_bot.attr.AP.get();
    let apr = combater_bot.attr.APRegen.get();

    let chooseSkillSpy = jest.spyOn(combater_bot, 'chooseSkill');
    let triggerSpy = jest.spyOn(combater_bot.statusManager, 'trigger');
    combater_bot.newRound();

    expect(chooseSkillSpy).toHaveBeenCalled();
    expect(combater_bot.attr.AP.get()).toBe(ap + apr);
    expect(triggerSpy).toHaveBeenCalledWith(EventCode.AfterNewRound, null);
  });

  // it.todo("Combater.loadSkill() create skill instance and push it to list");
  it('Combater.loadSkill()', () => {
    let length = combater_bot.skills.length;
    expect(length).toBe(0);
    combater_bot.loadSkill(normalAttack);
    expect(combater_bot.skills.length).toBe(1);
  });

  // it.todo("combater.castSkill() cast a spell to object and trigger event");
  it('Combater.castSkill()', () => {
    combater_engineer.loadSkill(normalAttack);
    let skill = combater_engineer.chooseSkill();

    let skillSpy = jest.spyOn(skill!, 'cast');
    let triggerSpy = jest.spyOn(combater_engineer.statusManager, 'trigger');

    combater_engineer.castSkill(combater_bot);

    expect(skillSpy).toHaveBeenCalled();
    expect(triggerSpy).toHaveBeenCalledWith(EventCode.BeforeCastSkill, combater_engineer);
    expect(triggerSpy).toHaveBeenCalledWith(EventCode.AfterCastSkill, combater_engineer);
  });

  // it.todo("Combater.chooseSkill() randomly select a skill that combaters meet it requirement");
  it('Combater.chooseSkill()', () => {
    combater_engineer.loadSkill(normalAttack);
    expect(combater_engineer.nextSkill).toBe(null);
    combater_engineer.chooseSkill();
    expect(combater_engineer.nextSkill).toBeDefined();
  });

  // it.todo("Combater.isReady() check combater can cast spell or not.");
  it('Combater.isReady()', () => {
    combater_engineer.loadSkill(normalAttack);
    let skill = combater_engineer.chooseSkill();
    expect(combater_engineer.isReady()).toBe(true);
    combater_engineer.loseAP(20, null);
    expect(combater_engineer.isReady()).toBe(false);
  });

  // it.todo("Combater.dealDamage() deal damage to target, trigger event");
  it('Combater.dealDamage()', () => {
    let triggerSpy = jest.spyOn(combater_engineer.statusManager, 'trigger');
    let getDamageSpy = jest.spyOn(combater_bot, 'getDamage');

    let damage = new Damage(5, DamageType.physical);
    combater_engineer.dealDamage(damage, combater_bot);

    expect(triggerSpy).toHaveBeenCalledWith(EventCode.BeforeDealDamage, combater_engineer);
    expect(triggerSpy).toHaveBeenCalledWith(EventCode.AfterDealDamage, combater_engineer);
    expect(getDamageSpy).toHaveBeenCalled();
  });

  it.todo('Combater.getDamage() get damage, trigger event');
  it.todo('Combater.loseHP() lose HP, trigger event');
  it.todo('Combater.getHP() get HP, trigger event');
  it.todo('Combater.loseAP() lose AP, trigger event');
  it.todo('Combater.getAP() get AP, trigger event');
  it.todo('Combater.getCombaterState() get combater inner state and information');
});
