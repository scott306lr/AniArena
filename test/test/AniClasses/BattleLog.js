export default class BattleLog{
  constructor(ID, StartTime, P1_ID, P1_Char, P2_ID, P2_Char, Winner, Log) {
    this.ID = ID;
    this.StartTime = StartTime;
    this.P1_ID = P1_ID;
    this.P1_Char = P1_Char;
    this.P2_ID = P2_ID;
    this.P2_Char = P2_Char;
    this.Winner = Winner;
    this.Log = Log;
  }
}