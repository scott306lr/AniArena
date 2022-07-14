import { Combater } from "../../client/AniClasses/Combater"
import { Player_JSON } from "../../client/AniClasses/Player"
import { Arena } from "../../client/AniClasses/Arena";
import { Skill_Fireball } from "../../client/AniClasses/Skill/Skill_Fireball"


describe('Skill Test', () =>{
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

    it("Normal Attack", ()=>{
        // Normal Attack deal 3 physical damage and use 3 ap.

        combater_engineer.loadSkill("Skill_NormalAttack");
        combater_engineer.chooseSkill();
        let botHP = combater_bot.attribute.HP.get();
        let engineerAP = combater_engineer.attribute.AP.get();
        combater_engineer.castSkill(combater_bot);

        expect(combater_bot.attribute.HP.get()).toBe(botHP - 3);
        expect(combater_engineer.attribute.AP.get()).toBe(engineerAP - 3);

        // console.log(arena.logger.get());


    });

    it("Fireball", ()=>{
        combater_engineer.loadSkill("Skill_Fireball");
        combater_engineer.chooseSkill();
        
        let botHP = combater_bot.attribute.HP.get();
        let engineerAP = combater_engineer.attribute.AP.get();
        combater_engineer.castSkill(combater_bot);

        expect(combater_bot.attribute.HP.get()).toBe(botHP - 3);
        expect(combater_engineer.attribute.AP.get()).toBe(engineerAP - 5);

        combater_bot.newRound();

        expect(combater_bot.attribute.HP.get()).toBe(botHP - 4);

        combater_bot.newRound();
        expect(combater_bot.attribute.HP.get()).toBe(botHP - 4);

        console.log(arena.logger.get());


    })


})