import { Status_Damage } from "../../src/utils/AniClasses/Status/Status_Damage"
import { Combater } from "../../src/utils/AniClasses/Combater"
import { Player_JSON } from "../../src/utils/AniClasses/Types"
import { Arena } from "../../src/utils/AniClasses/Arena";
import { Status_RoundDamage } from "../../src/utils/AniClasses/Status/Status_RoundDamage";
import { Damage, DamageType } from "../../src/utils/AniClasses/Damage";
import { Status_Invincible } from "../../src/utils/AniClasses/Status/Status_Invincible";


describe("Status Test", () => {
    let arena: Arena;
    let player1: Player_JSON;
    let player2: Player_JSON;
    let combater_engineer: Combater;
    let combater_bot: Combater;

    beforeEach(()=>{
        player1 = {
            id: "cl74noa020210cbvhgy3p1ctx",
            createdAt: new Date("2022-08-22T11:09:10.946Z"),
            updatedAt: new Date("2022-08-22T11:05:49.163Z"),
            userId: "cl747pr8k0018979tc4k8xj6k",
            name: "測試工程師",
            description: "我是測試工程師",
            combater: {
                id: "cl74o63wj0020wpvhyekqhcqz",
                createdAt: new Date("2022-08-22T11:23:02.851Z"),
                updatedAt: new Date("2022-08-22T11:16:30.944Z"),
                playerId: "cl74noa020210cbvhgy3p1ctx",
                characterId: 1,
                character: {
                    id: 1,
                    createdAt: new Date("2022-08-22T11:09:10.946Z"),
                    updatedAt: new Date("2022-08-22T11:05:49.163Z"),
                    name: "魔法學徒",
                    image: "",
                    description: '25歲的母胎單身之人，開始感覺到充沛的魔力湧出。',
                    orgAttr: {
                        level: 1,
                        exp: 0,
                        HP: 20,
                        AP: 5,
                        APRegen: 5
                    },
                    skills: [
                        {
                            "id": 1,
                            "createdAt": new Date("2022-08-22T10:38:38.623Z"),
                            "updatedAt": new Date("2022-08-22T04:37:59.873Z"),
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
                    ]
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
        player2.name = "測試機器人";

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