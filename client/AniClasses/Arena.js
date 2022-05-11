import Player from "./Player";

export default class Arena{
  constructor(P1_Char, P2_Char) {
    this.P1 = new Player(P1_Char, 1);
    this.P2 = new Player(P2_Char, 2);
    this.log = [];
  }

  newGame(){
    this.log = [];
    this.roundCount = 1;
    this.P1.HP = this.P1.Character.Abilities.HP_Init;
    this.P1.AP = this.P1.Character.Abilities.AP_Init;
    this.P2.HP = this.P2.Character.Abilities.HP_Init;
    this.P2.AP = this.P2.Character.Abilities.AP_Init;
  }

  newRound(){
    this.P1.AP += this.P1.AP_Regen;
    this.P2.AP += this.P2.AP_Regen;
    return true;
  }

  logRound(description){
    let log = "Turn $round: $description";
    this.log.push(log.replace('$round', this.roundCount).replace('$description',description));
    // this.log.push(
    //   {
    //   "Round": this.roundCount,
    //   "Description": description,
    //   }
    // )
  }
  endGameCondtion() {
    //End Game Condtions 
    if(this.P1.HP <= 0 && this.P2.HP <= 0){
      this.logRound(this.P1.Character.Owner_ID+' and '+this.P1.Character.Owner_ID+' fainted at the same time!');
      return true;
    } else if(this.P1.HP <= 0){
      this.logRound(this.P1.Character.Owner_ID+' was defeted!');
      return true;
    } else if(this.P2.HP <= 0) {
      this.logRound(this.P2.Character.Owner_ID+' was defeted!');
      return true;
    } else if(this.roundCount === maxRound){
      this.logRound('第三次衝擊！Game Over！')
      return true;
    } else {
      return false;
    }
  }

  startGame(){
    let maxRound = 20;
    this.P1.chooseSkill();
    this.P2.chooseSkill();

    while( this.roundCount <= maxRound ){
      // run EffectQueue
      this.P1.execEffect();
      this.P2.execEffect();
      if (this.endGameCondtion()) break;

      // decide who attacks first is possible
      let attacker;
      let defenser;
      if( this.P1.isReady() && this.P2.isReady() ){
        if( this.P1.nextSkill.AP_Cost <= this.P2.nextSkill.AP_Cost ){
          attacker = this.P1;
          defenser = this.P2;
        } else {
          attacker = this.P2;
          defenser = this.P1;
        }
      } else if( this.P1.isReady() ) {
        attacker = this.P1;
        defenser = this.P2;
      } else if( this.P2.isReady() ){
        attacker = this.P2;
        defenser = this.P1;
      }
      
      // process attack
      if(attacker !== undefined){
        //let log = attacker.attack(defenser);

        // attacker's raw attack state
        // attacker proccess attack state
        // defender proccess attack state
        // attack state is pushed to defender's EQ_NORM
        const attack_states = attacker.attack();
        const log = defenser.defend(attack_states);

        attacker.chooseSkill();
        //this.logRound(log);
        this.roundCount += 1;
      }
      if (this.endGameCondtion()) break;
      
      this.newRound();
    }
  }

  getLog(){
    return this.log;
  }
}