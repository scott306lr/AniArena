import EffectQueue from "./EffectQueue";
import State from "./State";

export default class Player{
  constructor(Character, Team) {
    this.Character = Character;
    this.Team = Team;
    this.HP = this.Character.Abilities.HP_Init;
    this.AP = this.Character.Abilities.AP_Init;
    this.AP_Regen = this.Character.Abilities.AP_Regen;
    this.nextSkill = null;
    this.EQ_NORM = new EffectQueue();
    this.EQ_ATK = new EffectQueue();
    this.EQ_DEF = new EffectQueue();
  }

  chooseSkill(){
    let atkSkills = this.Character.Skills;
    let randomIndex = Math.floor(Math.random()*atkSkills.length);
    this.nextSkill = atkSkills[randomIndex];
    return this.nextSkill;
  }

  /*Player defenser
  return battlelog*/
  attack(){
    //let counterSkill = defenser.counterSkill();
    //this.AP -= attackSkill.AP_Cost;
    //let attackerDamage = Math.max(0, attackSkill.ATK_Val - counterSkill.DEF_Val);
    //let defenserDamage = Math.max(0, counterSkill.ATK_Val - attackSkill.DEF_Val);
    //this.HP -= defenserDamage;
    //defenser.HP -= attackerDamage;
    //let retLog = attackSkill.Description.replace('$name',this.Character.Owner_ID) + 
    //                  " " +
    //                  counterSkill.Description.replace('$name', defenser.Character.Owner_ID);
    const states = this.nextSkill.States;

    //filter out states to EQ_ATK and EQ_DEF
    const to_atk = states.filter(state => state.loc === "ATK");
    const to_def = states.filter(state => state.loc === "DEF");
    const to_norm = states.filter(state => state.loc === "NORM");

    //push these states to corresponding EQ
    this.EQ_ATK.push_states(to_atk);
    this.EQ_DEF.push_states(to_def);

    //process remaining attack states
    const attack_states = this.EQ_ATK.effect(to_norm);
    return attack_states
  }

  defend(states){
    //process states
    states = this.EQ_DEF.effect(astates);
    states = this.EQ_NORM.effect(attack_states, countDown=false);
    const temp_EQ = new EffectQueue(states)
    
    //execute once, guess log here
    const log = "log here";
    const modified_status = temp_EQ.effect([this.getStatus()])[0];
    this.HP = modified_status.args["HP"];
    this.AP = modified_status.args["AP"];
    this.AP_Regen = modified_status.args["AP_Regen"];

    //add the rest of the states to EQ_NORM
    this.EQ_NORM.push_states(temp_EQ.Queue);

    return log;
  }

  

  getStatus(){
    return new State(9999, "status", 5, "NORM", "NONE", {"HP":this.HP, "AP":this.AP, "AP_Regen":this.AP_Regen}, [], ["status"]);
  }

  execEffect(){
    const modified_status = this.EQ_NORM.effect([this.getStatus()])[0];
    this.HP = modified_status.args["HP"];
    this.AP = modified_status.args["AP"];
    this.AP_Regen = modified_status.args["AP_Regen"];
  }

  isReady(){
    return this.AP > this.nextSkill.AP_Cost;
  }

}