import {EffectQueue} from "./EffectQueue";
import {State} from "./State";
import {Skill} from "./Skill";
import {Character} from "./Character";


export type Player_JSON = {
  Character: Character;
  Team: Number;
  HP: Number;
  AP: Number;
  AP_Regen: Number;
  nextSkill: Skill;
  EQ_NORM: EffectQueue;
  EQ_ATK: EffectQueue;
  EQ_DEF: EffectQueue;
}

export class Player{
  Character: Character;
  Team: Number;
  HP: Number;
  AP: Number;
  AP_Regen: Number;
  nextSkill: Skill | null;
  EQ_NORM: EffectQueue;
  EQ_ATK: EffectQueue;
  EQ_DEF: EffectQueue;


  constructor(Character:Character, Team:Number) {
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
    //let retLog = attackSkill.Description.replace('$name',this.Character.Owner_ID) + 
    //                  " " +
    //                  counterSkill.Description.replace('$name', defenser.Character.Owner_ID);
    if (!this.nextSkill) return; // no skill chosen
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

  defend(states: State[]){
    //process states
    states = this.EQ_DEF.effect(states);
    states = this.EQ_NORM.effect(states, false);
    const temp_EQ = new EffectQueue(states)
    console.log(states.map(state => state.name));
    
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
    const state_json = {
      cnt: 9999,
      name: "status",
      description: "HP",
      priority: 5,
      loc: "NORM",
      action: "NONE",
      args: {"HP":this.HP, "AP":this.AP, "AP_Regen":this.AP_Regen},
      effectOn: [],
      labels: []
    }
    return new State(state_json);
  }

  execEffect(){
    const modified_status = this.EQ_NORM.effect([this.getStatus()])[0];
    this.HP = modified_status.args["HP"];
    this.AP = modified_status.args["AP"];
    this.AP_Regen = modified_status.args["AP_Regen"];
  }

  isReady(){
    if (this.nextSkill){ 
      return this.AP > this.nextSkill.AP_Cost;
    }else {
      return false;
    }
  }

}