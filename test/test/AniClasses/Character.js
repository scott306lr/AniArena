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
          Type: "Attack",
          Description: "$name uses Mega Beam!",
          ATK_Val: 10,
          DEF_Val: 0,
          AP_Cost: 5,
        },
        {
          ID: 25,
          Name: "test25",
          Type: "React",
          Description: "$name Shields!",
          ATK_Val: 0,
          DEF_Val: 5,
          AP_Cost: 0,
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