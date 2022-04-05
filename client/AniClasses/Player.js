export default class Player{
  constructor(Character, Team) {
    this.Character = Character;
    this.Team = Team;
    this.HP = this.Character.Abilities.HP_Init;
    this.AP = this.Character.Abilities.AP_Init;
    this.AP_Regen = this.Character.Abilities.AP_Regen;
  }

  chooseSkill(){
    let atkFilter = (item, index, array) => { return item.Type == 'Attack'; };
    let atkSkills = this.Character.Skills.filter(atkFilter);
    let randomIndex = Math.floor(Math.random()*atkSkills.length);
    this.nextSkill = atkSkills[randomIndex];
    return this.nextSkill;
  }

  counterSkill(){
    let reactFilter = (item, index, array) => { return item.Type == 'React'; };
    let reactSkills = this.Character.Skills.filter(reactFilter);
    let randomIndex = Math.floor(Math.random()*reactSkills.length);
    return reactSkills[randomIndex];
  }

  /*Player defenser
  return battlelog*/
  attack(defenser){
    let attackSkill = this.nextSkill;
    let counterSkill = defenser.counterSkill();
    this.AP -= attackSkill.AP_Cost;
    let attackerDamage = Math.max(0, attackSkill.ATK_Val - counterSkill.DEF_Val);
    let defenserDamage = Math.max(0, counterSkill.ATK_Val - attackSkill.DEF_Val);
    this.HP -= defenserDamage;
    defenser.HP -= attackerDamage;
    let retLog = attackSkill.Description.replace('$name',this.Character.Owner_ID) + 
                      " " +
                      counterSkill.Description.replace('$name', defenser.Character.Owner_ID);
    return retLog
  }

  isReady(){
    return this.AP > this.nextSkill.AP_Cost;
  }

  

}