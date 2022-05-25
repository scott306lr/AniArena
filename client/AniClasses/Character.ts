import {State_JSON, State} from "./State";
import {Abilities_JSON, Abilities} from "./Abilities";
import {Skill_JSON, Skill} from "./Skill";

export type Character_JSON = {
  Owner_ID: number; 
  ID: number;
  Name: string;
  Rarity: string;
  Exp: number;
  Skills: Skill_JSON[];
  Abilities: Abilities_JSON;
}

export class Character{
  Owner_ID: number; 
  ID: number;
  Name: string;
  Rarity: string;
  Exp: number;
  Skills: Skill[];
  Abilities: Abilities;

  constructor(Owner_ID: number, Char_ID: number) {
    const data = this.fetchData(Owner_ID, Char_ID);
    this.loadData(data);
  }

  loadData(data: Character_JSON){
    this.Owner_ID = data.Owner_ID;
    this.ID = data.ID;
    this.Name = data.Name;
    this.Rarity = data.Rarity;
    this.Exp = data.Exp;
    this.Skills = data.Skills.map( s => new Skill(s) );
    this.Abilities = data.Abilities;
  }

  fetchData(Owner_ID: number, Char_ID: number){
    const data: Character_JSON = {
      Owner_ID: Owner_ID,
      ID: Char_ID,
      Name: "Star",
      Rarity: "SS",
      Exp: 0,
      Abilities: {
        HP_Init: 0,
        AP_Regen: 0,
        AP_Init: 0,
        Exp: 0
      },
      Skills: [
        {
          ID: 3,
          Name: "test3",
          Description: "$name uses Mega Beam!",
          Shoutout: "Ahhhhhh!",
          AP_Cost: 5,
          States: [
            {
              cnt: 1,
              name: "damage",
              description: "Thats a lot of damage!",
              priority: 5,
              loc: "NORM",
              action: "SUB",
              args: { "HP": 30 },
              effectOn: ["status"],
              labels: ["damage", "physical"],
            },
            {
              cnt: 2,
              name: "burning",
              description: "$name burning!",
              priority: 5,
              loc: "NORM",
              action: "SUB",
              args: { "HP": 5 },
              effectOn: ["status"],
              labels: ["burn", "fire", "debuff"]
            }
          ]
        },
        {
          ID: 25,
          Name: "test_shield",
          Description: "$name Shields!",
          Shoutout: "Shieeeeldddd!",
          AP_Cost: 3,
          States: [
            {
              cnt: 3,
              name: "reduce damage",
              description: "Reducing damage!",
              priority: 3,
              loc: "NORM",
              action: "SUB",
              args: { "HP": 5 },
              effectOn: ["damage", "debuff"],
              labels: ["protect", "buff"],
            },
            {
              cnt: 3,
              name: "slow",
              description: "so slow!",
              priority: 3,
              loc: "NORM",
              action: "SUB",
              args: { "AP_regen": 2 },
              effectOn: ["status"],
              labels: ["slow", "debuff"]
            }
          ]
        },
        {
          ID: 113,
          Name: "test_boost",
          Description: "$name pulls out the second sword!",
          Shoutout: "10 sec!",
          AP_Cost: 3,
          States: [
            {
              cnt: 4,
              name: "double physical damage",
              description: "wow!",
              priority: 0,
              loc: "NORM",
              action: "DUP",
              args: {},
              effectOn: ["physical"],
              labels: ["duplicate", "buff"],
            }
          ]
        },
      ]
    }
    return data;
  }

  fetchTestTarget(Owner_ID: number, Char_ID: number){
    const data: Character_JSON = {
      Owner_ID: Owner_ID,
      ID: Char_ID,
      Name: "測試用木頭人",
      Rarity: "D",
      Exp: 0,
      Abilities: {
        HP_Init: 9999,
        AP_Regen: 1,
        AP_Init: 10,
        Exp: 0
      },
      Skills: [
        {
          ID: 3,
          Name: "發呆",
          Description: "我只是個木頭人，啥麽也不會做",
          Shoutout: "我只是個木頭人，啥麽也不會做。",
          AP_Cost: 30,
          States: [
            {
              cnt: 1,
              name: "傷害",
              description: "木頭人只是站著，造成1點物理傷害",
              priority: 5,
              loc: "NORM",
              action: "SUB",
              args: { "HP": 1 },
              effectOn: ["status"],
              labels: ["damage", "physic"],
            }
          ]
        },
      ]
    }
    return data;
  }

  fetchMegumin(Owner_ID: number, Char_ID: number){
    const data: Character_JSON = {
      Owner_ID: Owner_ID,
      ID: Char_ID,
      Name: "惠惠",
      Rarity: "S",
      Exp: 0,
      Abilities: {
        HP_Init: 30,
        AP_Regen: 3,
        AP_Init: 10,
        Exp: 0
      },
      Skills: [
        {
          ID: 4,
          Name: "爆裂魔法",
          Description: "最強的爆裂魔法",
          Shoutout: "黑より黑く 闇より暗き漆黑に，我が深紅の混淆を望みたもう，覺醒のとき來たれり，無謬の境界に落ちし理，無行の歪みとなりて，現出せよ！Explosion!",
          AP_Cost: 20,
          States: [
            {
              cnt: 1,
              name: "燃燒傷害",
              description: "造成燃燒傷害！",
              priority: 5,
              loc: "NORM",
              action: "SUB",
              args: { "HP": 60 },
              effectOn: ["status"],
              labels: ["damage", "burn"],
            },
            {
              cnt: 4,
              name: "燃燒",
              description: "$name正在燃燒",
              priority: 5,
              loc: "NORM",
              action: "SUB",
              args: { "HP": 5 },
              effectOn: ["status"],
              labels: ["damage", "burn" , "debuff"],
            }
          ]
        },
      ]
    }
    return data;
  }

  fetchInanis(Owner_ID: number, Char_ID: number){
    const data: Character_JSON = {
      Owner_ID: Owner_ID,
      ID: Char_ID,
      Name: "古神祭司",
      Rarity: "S",
      Exp: 0,
      Abilities: {
        HP_Init: 50,
        AP_Regen: 2,
        AP_Init: 0,
        Exp: 0
      },
      Skills: [
        {
          ID: 4,
          Name: "古神的餅乾",
          Description: "古神的餅乾，受到攻擊回覆血量，增強攻擊",
          Shoutout: "古神的餅乾，受到攻擊回覆血量，增強攻擊",
          AP_Cost: 6,
          States: [
            {
              cnt: 5,
              name: "恢復",
              description: "恢復",
              priority: 5,
              loc: "DEF",
              action: "ADD",
              args: { "HP": 5 },
              effectOn: ["status"],
              labels: ["buff", "heal"],
            },
            {
              cnt: 5,
              name: "好心情",
              description: "增幅攻擊",
              priority: 5,
              loc: "ATK",
              action: "MUL",
              args: { "HP": 2 },
              effectOn: ["emotion"],
              labels: ["buff", "sharpen"],
            }
          ]
        },
        {
          ID: 4,
          Name: "古神的低語",
          Description: "¸»ט¦ח”¨譚涓･隗ょｯ甸滉ｸ銝”¨ז¥ט§‚餉�潰�鍂",
          Shoutout: "¸»ט¦ח”¨譚涓･隗ょｯ甸滉ｸ銝”¨ז¥ט§‚餉�潰�鍂",
          AP_Cost: 7,
          States: [
            {
              cnt: 1,
              name: "精神攻擊",
              description: "精神攻擊",
              priority: 5,
              loc: "NORM",
              action: "SUB",
              args: { "HP": 7 },
              effectOn: ["status"],
              labels: ["damage", "emotion"],
            },
            {
              cnt: 5,
              name: "出血",
              description: "出血",
              priority: 5,
              loc: "NORM",
              action: "SUB",
              args: { "HP": 1 },
              effectOn: ["status"],
              labels: ["damage", "bleed", "debuff"],
            },
            {
              cnt: 4,
              name: "遲緩",
              description: "遲緩",
              priority: 5,
              loc: "NORM",
              action: "SUB",
              args: { "AP": 1 },
              effectOn: ["status"],
              labels: ["interfere", "debuff"],
            }
          ]
        },
        {
          ID: 4,
          Name: "Wah!",
          Description: "Wah!",
          Shoutout: "Wah!",
          AP_Cost: 3,
          States: [
            {
              cnt: 1,
              name: "驚嚇",
              description: "驚嚇",
              priority: 5,
              loc: "NORM",
              action: "SUB",
              args: { "HP": 10 },
              effectOn: ["status"],
              labels: ["damage", "emotion"],
            }
          ]
        },
      ]
    }
    return data;
  }

  fetchReimu(Owner_ID: number, Char_ID: number){
    const data: Character_JSON = {
      Owner_ID: Owner_ID,
      ID: Char_ID,
      Name: "赤色殺人魔",
      Rarity: "S",
      Exp: 0,
      Abilities: {
        HP_Init: 35,
        AP_Regen: 2,
        AP_Init: 6,
        Exp: 0
      },
      Skills: [
        {
          ID: 4,
          Name: "擦彈飛行",
          Description: "開始擦彈飛行",
          Shoutout: "開始擦彈飛行，防禦3點以下物理元素傷害",
          AP_Cost: 5,
          States: [
            {
              cnt: 10,
              name: "防禦",
              description: "防禦",
              priority: 5,
              loc: "DEF",
              action: "SUB",
              args: { "HP": 3 },
              effectOn: ["physic","element"],
              labels: ["buff", "block"],
            }
          ]
        },
        {
          ID: 4,
          Name: "祈禱",
          Description: "祈禱",
          Shoutout: "祈禱",
          AP_Cost: 6,
          States: [
            {
              cnt: 5,
              name: "祈禱",
              description: "祈禱",
              priority: 5,
              loc: "ATK",
              action: "MUL",
              args: { "HP": 2 },
              effectOn: ["damage"],
              labels: ["buff", "shapen"],
            }
          ]
        },
        {
          ID: 4,
          Name: "夢想封印",
          Description: "夢想封印",
          Shoutout: "夢想封印，減少敵方AP",
          AP_Cost: 5,
          States: [
            {
              cnt: 1,
              name: "夢想封印",
              description: "夢想封印",
              priority: 5,
              loc: "NORM",
              action: "SUB",
              args: { "AP": 8 },
              effectOn: ["status"],
              labels: ["debuff", "interfere"],
            }
          ]
        },
        {
          ID: 4,
          Name: "靈擊",
          Description: "靈擊",
          Shoutout: "靈擊，造成兩次物理傷害",
          AP_Cost: 3,
          States: [
            {
              cnt: 1,
              name: "靈擊",
              description: "物理傷害",
              priority: 5,
              loc: "NORM",
              action: "SUB",
              args: { "HP": 6 },
              effectOn: ["status"],
              labels: ["damage", "physic"],
            },
            {
              cnt: 1,
              name: "靈擊",
              description: "物理傷害",
              priority: 5,
              loc: "NORM",
              action: "SUB",
              args: { "HP": 6 },
              effectOn: ["status"],
              labels: ["damage", "physic"],
            }
          ]
        },
      ]
    }
    return data;
  }

  fetchKirito(Owner_ID: number, Char_ID: number){
    const data: Character_JSON = {
      Owner_ID: Owner_ID,
      ID: Char_ID,
      Name: "黑色劍士",
      Rarity: "S",
      Exp: 0,
      Abilities: {
        HP_Init: 40,
        AP_Regen: 2,
        AP_Init: 3,
        Exp: 0
      },
      Skills: [
        {
          ID: 4,
          Name: "風刃",
          Description: "風刃",
          Shoutout: "快速的一擊！",
          AP_Cost: 2,
          States: [
            {
              cnt: 1,
              name: "風刃",
              description: "風刃",
              priority: 5,
              loc: "NORM",
              action: "SUB",
              args: { "HP": 6 },
              effectOn: ["status"],
              labels: ["damage", "physic"],
            }
          ]
        },
        {
          ID: 4,
          Name: "十字防禦",
          Description: "防禦",
          Shoutout: "擺出防禦架式",
          AP_Cost: 3,
          States: [
            {
              cnt: 5,
              name: "block physic",
              description: "block",
              priority: 6,
              loc: "DEF",
              action: "SUB",
              args: { "HP": 5 },
              effectOn: ["physic"],
              labels: ["block", "buff"],
            }
          ]
        },
        {
          ID: 5,
          Name: "星爆氣流斬",
          Description: "反應速度最快的玩家持有技能",
          Shoutout: "Start Burst STREAM !",
          AP_Cost: 16,
          States: [
            {
              cnt: 1,
              name: "傷害",
              description: "造成物理傷害！",
              priority: 5,
              loc: "NORM",
              action: "SUB",
              args: { "HP": 3 },
              effectOn: ["status"],
              labels: ["damage", "physic"],
            },
            {
              cnt: 1,
              name: "傷害",
              description: "造成物理傷害！",
              priority: 5,
              loc: "NORM",
              action: "SUB",
              args: { "HP": 2 },
              effectOn: ["status"],
              labels: ["damage", "physic"],
            },
            {
              cnt: 1,
              name: "傷害",
              description: "造成物理傷害！",
              priority: 5,
              loc: "NORM",
              action: "SUB",
              args: { "HP": 3 },
              effectOn: ["status"],
              labels: ["damage", "physic"],
            },
            {
              cnt: 1,
              name: "傷害",
              description: "造成物理傷害！",
              priority: 5,
              loc: "NORM",
              action: "SUB",
              args: { "HP": 2 },
              effectOn: ["status"],
              labels: ["damage", "physic"],
            },
            {
              cnt: 1,
              name: "傷害",
              description: "造成物理傷害！",
              priority: 5,
              loc: "NORM",
              action: "SUB",
              args: { "HP": 2 },
              effectOn: ["status"],
              labels: ["damage", "physic"],
            },
            {
              cnt: 1,
              name: "傷害",
              description: "造成物理傷害！",
              priority: 5,
              loc: "NORM",
              action: "SUB",
              args: { "HP": 3 },
              effectOn: ["status"],
              labels: ["damage", "physic"],
            },
            {
              cnt: 1,
              name: "傷害",
              description: "造成物理傷害！",
              priority: 5,
              loc: "NORM",
              action: "SUB",
              args: { "HP": 3 },
              effectOn: ["status"],
              labels: ["damage", "physic"],
            },
            {
              cnt: 1,
              name: "傷害",
              description: "造成物理傷害！",
              priority: 5,
              loc: "NORM",
              action: "SUB",
              args: { "HP": 2 },
              effectOn: ["status"],
              labels: ["damage", "physic"],
            },
            {
              cnt: 1,
              name: "傷害",
              description: "造成物理傷害！",
              priority: 5,
              loc: "NORM",
              action: "SUB",
              args: { "HP": 3 },
              effectOn: ["status"],
              labels: ["damage", "physic"],
            },
            {
              cnt: 1,
              name: "傷害",
              description: "造成物理傷害！",
              priority: 5,
              loc: "NORM",
              action: "SUB",
              args: { "HP": 4 },
              effectOn: ["status"],
              labels: ["damage", "physic"],
            },
            {
              cnt: 1,
              name: "傷害",
              description: "造成物理傷害！",
              priority: 5,
              loc: "NORM",
              action: "SUB",
              args: { "HP": 5 },
              effectOn: ["status"],
              labels: ["damage", "physic"],
            },
            {
              cnt: 1,
              name: "傷害",
              description: "造成物理傷害！",
              priority: 5,
              loc: "NORM",
              action: "SUB",
              args: { "HP": 2 },
              effectOn: ["status"],
              labels: ["damage", "physic"],
            },
            {
              cnt: 1,
              name: "傷害",
              description: "造成物理傷害！",
              priority: 5,
              loc: "NORM",
              action: "SUB",
              args: { "HP": 3 },
              effectOn: ["status"],
              labels: ["damage", "physic"],
            },
            {
              cnt: 1,
              name: "傷害",
              description: "造成物理傷害！",
              priority: 5,
              loc: "NORM",
              action: "SUB",
              args: { "HP": 1 },
              effectOn: ["status"],
              labels: ["damage", "physic"],
            },
            {
              cnt: 1,
              name: "傷害",
              description: "造成物理傷害！",
              priority: 5,
              loc: "NORM",
              action: "SUB",
              args: { "HP": 2 },
              effectOn: ["status"],
              labels: ["damage", "physic"],
            },
            {
              cnt: 1,
              name: "傷害",
              description: "造成物理傷害！",
              priority: 5,
              loc: "NORM",
              action: "SUB",
              args: { "HP": 10 },
              effectOn: ["status"],
              labels: ["damage", "physic"],
            },
          ]
        },
      ]
    }
    return data;
  }


}