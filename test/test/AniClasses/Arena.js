import Player from "./Player";

export default class Arena{
  constructor(P1_Char, P2_Char) {
    this.P1 = new Player(P1_Char, 1);
    this.P2 = new Player(P2_Char, 2);
  }

  newGame(){}

  newRound(){
    this.P1.AP += this.P1.AP_Regen;
    this.P2.AP += this.P2.AP_Regen;
    return true;
  }
}