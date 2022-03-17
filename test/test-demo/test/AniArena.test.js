class Personal_Data{
  constructor(HP_Init, AP_Regen, AP_Init, Exp) {
    this.HP_Init = HP_Init;
    this.AP_Regen = AP_Regen;
    this.AP_Init = AP_Init;
    this.Exp = Exp;
  }
}

class Abilites{
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
      "Skills": [1, 3, 5, 11, 21]
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

describe('Arena Test', () => {
  const abilites = new Abilites(10, 10, 10, 10);
  const P1_Char = new Character(100, 100, abilites, 100);
  const P2_Char = new Character(100, 100, abilites, 100);

  it.todo('New Game initializes HP, AP');

  it('New Round Regenerates AP', () => {
    const arena = new Arena(P1_Char, P2_Char);
    
    original_AP = arena.P1.AP;
    arena.newRound();
    expect(arena.P1.AP).toBe(original_AP + arena.P1.AP_Regen);
  });


})