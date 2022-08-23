import { Player, Combater as tCombater, Character, Skill } from "@prisma/client";

export type Skill_JSON = Skill
// export type Skill_JSON = {
//     id: number,
//     createdAt: string,
//     updatedAt: string,
//     name: string,
//     image: string | null,
//     description: string,
//     requirement: {
//         level?: number,
//         AP?: number,
//     },
//     cost: {
//         AP: number,
//         HP?: number,
//     }
// };

export type Attribute_JSON = {
    level: number;
    exp: number;
    HP: number;
    AP: number;
    APRegen: number;
}

export type Character_JSON = Character & { skills: Skill[]; }

export type Combater_JSON = tCombater

// type ProfileType = inferQueryOutput<"me.getProfile">;
export type Player_JSON = Player & { combater: (tCombater & { character: Character & { skills: Skill[]; }; }) | null; }

// example 
const player_json: Player_JSON = {
    "id": "cl74noa020210cbvhgy3p1ctx",
    "createdAt": new Date("2022-08-22T11:09:10.946Z"),
    "updatedAt": new Date("2022-08-22T11:05:49.163Z"),
    "userId": "cl747pr8k0018979tc4k8xj6k",
    "name": "須鄉",
    "description": "我有管理者權限哈哈哈哈哈",
    "combater": {
        "id": "cl74o63wj0020wpvhyekqhcqz",
        "createdAt": new Date("2022-08-22T11:23:02.851Z"),
        "updatedAt": new Date("2022-08-22T11:16:30.944Z"),
        "playerId": "cl74noa020210cbvhgy3p1ctx",
        "characterId": 1,
        "attr": {
            "AP": 200,
            "HP": 200,
            "exp": 9999,
            "level": 99,
            "APRegen": 20
        },
        "character": {
            "id": 1,
            "createdAt": new Date("2022-08-16T15:01:20.786Z"),
            "updatedAt": new Date("2022-08-16T15:00:23.088Z"),
            "name": "瓦力",
            "image": "https://images-ext-1.discordapp.net/external/NwoQ6n6EF_KlhjmSezDNFmFxXCLl2-gxTfDKNddYnC4/https/mudae.net/uploads/1928259/Ph5SE52fDdJjU9jN1VcU~xu2VUef.png",
            "description": "我是瓦力",
            "orgAttr": {
                "AP": 5,
                "HP": 20,
                "exp": 0,
                "level": 1,
                "APRegen": 5
            },
            "skills": [
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
                },
                {
                    "id": 2,
                    "createdAt": new Date("2022-08-22T10:38:38.624Z"),
                    "updatedAt": new Date("2022-08-22T10:35:47.586Z"),
                    "name": "破壞死光",
                    "image": null,
                    "description": "你一定是開掛了才學會這招",
                    "requirement": {
                        "AP": 99,
                        "level": 87
                    },
                    "cost": {
                        "AP": 90,
                        "HP": 0
                    }
                }
            ]
        }
    }
}