import { Player_JSON, Skill_JSON } from "../../src/utils/AniClasses/Types"
import { Combater } from "../../src/utils/AniClasses/Combater"
import { Arena } from "../../src/utils/AniClasses/Arena"
import { EventCode } from "../../src/utils/AniClasses/StatusManager";
import { Damage, DamageType } from "../../src/utils/AniClasses/Damage";

describe("Arena Test", () => {
    let arena: Arena;
    let player1: Player_JSON;
    let player2: Player_JSON;
    let engineer: Combater;
    let bot: Combater;
    let normalAttack: Skill_JSON;
    let fireball: Skill_JSON;

    beforeEach(()=>{
        player1 = {
            name: "測試工程師",
            description: "我是測試工程師",
            combater: {
                character: {
                    name: "魔法學徒",
                    id: 1,
                    image: null,
                    description: '25歲的母胎單身之人，開始感覺到充沛的魔力湧出。',
                    orgAttr: {
                        level: 1,
                        exp: 0,
                        HP: 20,
                        AP: 5,
                        APRegen: 5
                    },
                    skills: []
                },
                attr: {
                    level: 1,
                    exp: 0,
                    HP: 20,
                    AP: 5,
                    APRegen: 5
                },
            }
        }
        player2 = JSON.parse(JSON.stringify(player1));
        player2.name = "機器人";

        normalAttack = {
            "id": 1,
            "createdAt": "2022-08-22T10:38:38.623Z",
            "updatedAt": "2022-08-22T04:37:59.873Z",
            "name": "普通攻擊",
            "image": null,
            "description": "對敵人造成普通程度的物理傷害",
            "requirement": {
                "level": 0,
            },
            "cost": {
                "AP": 3,
            }
        }

        fireball = {
            "id": 1,
            "createdAt": "2022-08-22T10:38:38.623Z",
            "updatedAt": "2022-08-22T04:37:59.873Z",
            "name": "火球術",
            "image": null,
            "description": "儘管是最基礎的攻擊魔法，也要耗費三十年習得",
            "requirement": {
                "level": 0
            },
            "cost": {
                "AP": 5,
                "HP": 0
            }
        }

        arena = new Arena(player1, player2);
        engineer = new Combater(player1, arena);
        bot = new Combater(player2, arena);
    })

    it("start test", () => {
        arena.combater1.loadSkill(fireball);
        arena.combater2.loadSkill(normalAttack);
        arena.start();
        let log = arena.getLog();
        console.log(log);
        // for( let i = 0; i < log.logs.length; ++i){
        //     console.log(log.logs[i].logger);
        //     console.log(log.logs[i].log);
        // }
    })

    

})