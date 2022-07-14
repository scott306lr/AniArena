import { Status_Damage } from "../../client/AniClasses/Status/Status_Damage"
import { Combater } from "../../client/AniClasses/Combater"
import { Player_JSON } from "../../client/AniClasses/Player"
import { Arena } from "../../client/AniClasses/Arena";
import { Status_RoundDamage } from "../../client/AniClasses/Status/Status_RoundDamage";
import { Damage, DamageType } from "../../client/AniClasses/Damage";
import { Status_Invincible } from "../../client/AniClasses/Status/Status_Invincible";


describe("Status Test", () => {
    let arena;
    let player1: Player_JSON;
    let player2: Player_JSON;
    let combater_engineer: Combater;
    let combater_bot: Combater;

    beforeEach(()=>{
        player1 = {
            email: "testemail@gmail.com",
            nickname: "測試工程師",
            description: "我是測試工程師",
            unlock_characters: ["測試魔法工程師"],
            combater: {
                character: "測試魔法工程師",
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
        player2.nickname = "測試機器人";

        arena = new Arena(player1, player2);
        combater_engineer = new Combater(player1, arena);
        combater_bot = new Combater(player2, arena);
    })
    
    
    it("apply damage", () => {
        let damage = new Damage(5, DamageType.physical)
        let testStatus = new Status_Damage(combater_bot,damage);
        
        let originalHP = combater_bot.attribute.HP.get();
        testStatus.apply(combater_bot);
        let hurtHP = combater_bot.attribute.HP.get();
        expect(hurtHP).toBe(originalHP - damage.value);
        // console.log(arena.logger.get());

    })

    it("round damage", () => {
        let damage = new Damage(3, DamageType.magic);
        let testStatus = new Status_RoundDamage(combater_engineer, damage, 2, "中毒", `受中毒狀態影響`);

        let originalHP = combater_bot.attribute.HP.get();
        testStatus.apply(combater_bot);
        
        expect(combater_bot.attribute.HP.get()).toBe(originalHP);
        expect(combater_bot.statusManager.statusList.length).toBe(1);
        //first round
        combater_bot.newRound();
        expect(combater_bot.attribute.HP.get()).toBe(originalHP - damage.value);

        //second round
        combater_bot.newRound();
        expect(combater_bot.attribute.HP.get()).toBe(originalHP - 2*damage.value);

        expect(combater_bot.statusManager.statusList.length).toBe(0);
        // console.log(arena.logger.get());

    });

    it("invincible", () => {
        let damage = new Damage(5, DamageType.magic);
        let testStatus = new Status_Invincible(combater_bot, undefined, 1);

        testStatus.apply(combater_bot);
        let originalHP = combater_bot.attribute.HP.get();
        combater_engineer.dealDamage(damage, combater_bot);
        expect(combater_bot.attribute.HP.get()).toBe(originalHP);

        combater_engineer.dealDamage(damage, combater_bot);
        expect(combater_bot.attribute.HP.get()).toBe(originalHP - damage.value);

        // console.log(arena.logger.get());

    });

})