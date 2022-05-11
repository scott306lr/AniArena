type Personal_Data_JSON = {
  HP_Init: number;
  AP_Regen: number;
  AP_Init: number;
  Exp: number;
}

class Personal_Data{
  HP_Init: number;
  AP_Regen: number;
  AP_Init: number;
  Exp: number;

  constructor(pdata_json: Personal_Data_JSON) {
    this.HP_Init = pdata_json.HP_Init;
    this.AP_Regen = pdata_json.AP_Regen;
    this.AP_Init = pdata_json.AP_Init;
    this.Exp = pdata_json.Exp;
  }
}