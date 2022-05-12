export type Abilities_JSON = {
  HP_Init: number;
  AP_Regen: number;
  AP_Init: number;
  Exp: number;
}

export class Abilities{
  HP_Init: number;
  AP_Regen: number;
  AP_Init: number;
  Exp: number;

  constructor(abilities_json: Abilities_JSON) {
    this.HP_Init = abilities_json.HP_Init;
    this.AP_Regen = abilities_json.AP_Regen;
    this.AP_Init = abilities_json.AP_Init;
    this.Exp = abilities_json.Exp;
  }
}