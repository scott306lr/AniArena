import { Player_JSON } from "../../client/AniClasses/Player"
import { Combater } from "../../client/AniClasses/Combater"
import { Arena } from "../../client/AniClasses/Arena"
import { EventCode } from "../../client/AniClasses/StatusManager";
import { Damage, DamageType } from "../../client/AniClasses/Damage";

describe("Combater Test", () => {
    let arena;
    let player1: Player_JSON;
    let player2: Player_JSON;
    let combater_engineer: Combater;
    let combater_bot: Combater;

    beforeEach(()=>{
        player1 = {
            email: "testemail@gmail.com",
            nickname: "工程師",
            description: "工程師",
            unlock_characters: ["工程師"],
            combater: {
                character: "工程師",
                attribute: {
                    level: 1,
                    exp: 0,
                    HP: 20,
                    AP: 5,
                    APRegen: 5
                },
                inherent_skills: [],
            }
        }
        player2 = JSON.parse(JSON.stringify(player1));
        player2.nickname = "機器人";

        arena = new Arena(player1, player2);
        combater_engineer = new Combater(player1, arena);
        combater_bot = new Combater(player2, arena);
    })

    // it.todo("Combater.reset() reset all attribute and state");
    it("Combater.reset()", () => {
        player1.email = "newvalue";
        combater_bot.reset(player1);

        expect(combater_bot.player.email).toBe(player1.email);

        let hp = combater_bot.attribute.HP.get();
        combater_bot.loseHP(3, undefined);
        expect(combater_bot.attribute.HP.get()).toBe(hp - 3);
        combater_bot.reset();
        expect(combater_bot.attribute.HP.get()).toBe(hp);
    });

    it.todo("Combater.fetchCharacter() get character from database");
    it.todo("Combater.interrupt() tell combater should break current action.");
    
    
    // it.todo("Combater.newRound() regenerate AP, chooseSkill, trigger event");
    it("Combater.newRound()", () => {
        combater_bot.loseAP(10, undefined);

        let ap = combater_bot.attribute.AP.get();
        let apr = combater_bot.attribute.APRegen.get();

        let chooseSkillSpy = jest.spyOn(combater_bot, "chooseSkill");
        let triggerSpy = jest.spyOn(combater_bot.statusManager, "trigger");
        combater_bot.newRound();


        expect(chooseSkillSpy).toHaveBeenCalled();
        expect(combater_bot.attribute.AP.get()).toBe(ap + apr);
        expect(triggerSpy).toHaveBeenCalledWith(EventCode.AfterNewRound, undefined);

    });
    
    // it.todo("Combater.loadSkill() create skill instance and push it to list");
    it("Combater.loadSkill()", () => {
        let length = combater_bot.skills.length;
        expect(length).toBe(0);
        combater_bot.loadSkill("Skill_NormalAttack");
        expect(combater_bot.skills.length).toBe(1);
    });

    // it.todo("combater.castSkill() cast a spell to object and trigger event");
    it("Combater.castSkill()", () => {
        combater_engineer.loadSkill("Skill_NormalAttack");
        let skill = combater_engineer.chooseSkill();
        

        let skillSpy = jest.spyOn(skill, "cast");
        let triggerSpy = jest.spyOn(combater_engineer.statusManager, "trigger");

        combater_engineer.castSkill(combater_bot);

        expect(skillSpy).toHaveBeenCalled();
        expect(triggerSpy).toHaveBeenCalledWith(EventCode.BeforeCastSkill, combater_engineer);
        expect(triggerSpy).toHaveBeenCalledWith(EventCode.AfterCastSkill, combater_engineer);

    })

    // it.todo("Combater.chooseSkill() randomly select a skill that combaters meet it requirement");
    it("Combater.chooseSkill()", () => {
        combater_engineer.loadSkill("Skill_NormalAttack");
        expect(combater_engineer.nextSkill).toBe(undefined);
        combater_engineer.chooseSkill();
        expect(combater_engineer.nextSkill).toBeDefined();
    })
        
    // it.todo("Combater.isReady() check combater can cast spell or not.");
    it("Combater.isReady()", () => {
        combater_engineer.loadSkill("Skill_NormalAttack");
        let skill = combater_engineer.chooseSkill();
        expect(combater_engineer.isReady()).toBe(true);
        combater_engineer.loseAP(20, undefined);
        expect(combater_engineer.isReady()).toBe(false);
    })

    // it.todo("Combater.dealDamage() deal damage to target, trigger event");
    it("Combater.dealDamage()", () => {
        let triggerSpy = jest.spyOn(combater_engineer.statusManager, "trigger");
        let getDamageSpy = jest.spyOn(combater_bot, "getDamage");

        let damage = new Damage(5, DamageType.physical);
        combater_engineer.dealDamage(damage, combater_bot);

        expect(triggerSpy).toHaveBeenCalledWith(EventCode.BeforeDealDamage, combater_engineer);
        expect(triggerSpy).toHaveBeenCalledWith(EventCode.AfterDealDamage, combater_engineer);
        expect(getDamageSpy).toHaveBeenCalled();        
    })

    it.todo("Combater.getDamage() get damage, trigger event");
    it.todo("Combater.loseHP() lose HP, trigger event");
    it.todo("Combater.getHP() get HP, trigger event");
    it.todo("Combater.loseAP() lose AP, trigger event");
    it.todo("Combater.getAP() get AP, trigger event");
    it.todo("Combater.getCombaterState() get combater inner state and information");



})