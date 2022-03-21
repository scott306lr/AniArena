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
  }

  startGame(){
    let maxRound = 20;
    
    this.P1.chooseSkill();
    this.P2.chooseSkill();

    while( this.roundCount <= maxRound ){
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

      if(attacker != undefined){
        let log = attacker.attack(defenser);
        attacker.chooseSkill();
        this.logRound(log);
        this.roundCount += 1;
      }

      

      if(this.P1.HP <= 0){
        this.logRound(this.P1.Character.Owner_ID+' was defeted!');
        break;
      } else if(this.P2.HP <= 0) {
        this.logRound(this.P2.Character.Owner_ID+' was defeted!');
        break;
      } else if(this.roundCount == maxRound){
        this.logRound('第三次衝擊！Game Over！')
        break;
      }

      this.newRound();
    }
  }

  getLog(){
    return this.log;
  }
}