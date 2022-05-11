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

  constructor(character_json: Character_JSON) {
    const data = this.fetchData(character_json.ID);

    this.Owner_ID = character_json.Owner_ID;
    this.ID = character_json.ID;
    this.Name = data["Name"];
    this.Rarity = data["Rarity"];
    this.Exp = character_json.Exp;
    this.Skills = data["Skills"].map( s => new Skill(s) );
    this.Abilities = character_json.Abilities;
  }

  fetchData(Char_ID: number){
    const data: Character_JSON = {
      Owner_ID: 0,
      ID: 0,
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

}