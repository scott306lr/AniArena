class Personal_Data{
  constructor(HP_Init, AP_Regen, AP_Init, Exp) {
    this.HP_Init = HP_Init;
    this.AP_Regen = AP_Regen;
    this.AP_Init = AP_Init;
    this.Exp = Exp;
  }
}

class Skill{
  constructor(ID, Name, Type, Description, ATK_Val, DEF_Val, AP_Cost) {
    this.ID = ID;
    this.Name = Name;
    this.Type = Type;
    this.Description = Description;
    this.ATK_Val = ATK_Val;
    this.DEF_Val = DEF_Val;
    this.AP_Cost = AP_Cost;
  }
}

class Abilities{
  constructor(HP_Init, AP_Regen, AP_Init, Exp) {
    this.HP_Init = HP_Init;
    this.AP_Regen = AP_Regen;
    this.AP_Init = AP_Init;
    this.Exp = Exp;
  }
}

class Character{
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

class Player{
  constructor(Character, Team) {
    this.Character = Character;
    this.Team = Team;
    this.HP = this.Character.Abilities.HP_Init;
    this.AP = this.Character.Abilities.AP_Init;
    this.AP_Regen = this.Character.Abilities.AP_Regen;
  }
}

class Arena{
  constructor(P1_Char, P2_Char) {
    this.P1 = new Player(P1_Char, 1);
    this.P2 = new Player(P2_Char, 2);
  }

  newGame(){

  }

  newRound(){
    this.P1.AP += this.P1.AP_Regen;
    this.P2.AP += this.P2.AP_Regen;
    return true;
  }
}