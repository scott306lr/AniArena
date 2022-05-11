export default class Character{
  constructor(Owner_ID, Char_ID, Abilites, Exp) {
    const data = this.fetchData(Char_ID);

    this.Owner_ID = Owner_ID;
    this.ID = Char_ID;
    this.Name = data["Name"];
    this.Rarity = data["Rarity"];
    this.Exp = Exp;
    this.Skills = data["Skills"];
    this.Abilities = Abilites;
  }

  fetchData(Char_ID){
    const data = {
      "Name": "Star",
      "Rarity": "SS",
      "Skills": [
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
              definition: "Thats a lot of damage!",
              priority: 5,
              loc: "NORM",
              action: "SUB",
              args: {"HP": 30},
              effectOn: ["status"],
              label: ["damage", "physical"],
            },
            {
              cnt: 2,
              name: "burning",
              definition: "$name burning!",
              priority: 5,
              loc: "NORM",
              action: "SUB",
              args: {"HP": 5},
              effectOn: ["status"], 
              label: ["burn", "fire", "debuff"]
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
              definition: "Reducing damage!",
              priority: 3,
              loc: "NORM",
              action: "SUB",
              args: {"HP": 5},
              effectOn: ["damage", "debuff"],
              label: ["protect", "buff"],
            },
            {
              cnt: 3,
              name: "slow",
              definition: "so slow!",
              priority: 3,
              loc: "NORM",
              action: "SUB",
              args: {"AP_regen": 2},
              effectOn: ["status"], 
              label: ["slow", "debuff"]
            }
          ]
        },
        {
          ID: 113,
          Name: "test113",
          Type: "React",
          Description: "$name blocks and counter attacks!",
          ATK_Val: 3,
          DEF_Val: 3,
          AP_Cost: 0,
        },
      ]
    }
    return data;
  }

}