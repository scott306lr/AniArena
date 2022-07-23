import { Player_JSON } from "../../client/AniClasses/Player"
import { Combater } from "../../client/AniClasses/Combater"
import { Arena } from "../../client/AniClasses/Arena"
import { EventCode } from "../../client/AniClasses/StatusManager";
import { Damage, DamageType } from "../../client/AniClasses/Damage";

describe("Arena Test", () => {
    let arena: Arena;
    let player1: Player_JSON;
    let player2: Player_JSON;
    let engineer: Combater;
    let bot: Combater;

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
        engineer = new Combater(player1, arena);
        bot = new Combater(player2, arena);
    })

    it("start test", () => {
        arena.combater1.loadSkill("Skill_Fireball");
        arena.combater2.loadSkill("Skill_NormalAttack")
        arena.start();
        let log = arena.getLog();
        console.log(log);
        // for( let i = 0; i < log.logs.length; ++i){
        //     console.log(log.logs[i].logger);
        //     console.log(log.logs[i].log);
        // }
    })

    

})