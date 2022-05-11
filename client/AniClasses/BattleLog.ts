import {Character_JSON, Character} from "./Character";

type BattleLog_JSON = {
  ID: number;
  StartTime: Date;
  P1_ID: number;
  P1_Char: Character;
  P2_ID: number;
  P2_Char: Character;
  Winner: number;
  Log: string[];
}

export default class BattleLog{
  ID: number;
  StartTime: Date;
  P1_ID: number;
  P1_Char: Character;
  P2_ID: number;
  P2_Char: Character;
  Winner: number;
  Log: string[];

  //to be corrected
  constructor(battle_json: BattleLog_JSON) {
    this.ID = battle_json.ID;
    this.StartTime = battle_json.StartTime;
    this.P1_ID = battle_json.P1_ID;
    this.P1_Char = battle_json.P1_Char;
    this.P2_ID = battle_json.P2_ID;
    this.P2_Char = battle_json.P2_Char;
    this.Winner = battle_json.Winner;
    this.Log = battle_json.Log;
  }
}