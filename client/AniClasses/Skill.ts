import {State_JSON, State} from "./State";

export type Skill_JSON = {
  ID: number;
  Name: string;
  Description: string;
  Shoutout: string;
  AP_Cost: number;
  States: State_JSON[];
}

export class Skill{
  ID: number;
  Name: string;
  Description: string;
  Shoutout: string;
  AP_Cost: number;
  States: State[];

  constructor(skill_json: Skill_JSON) {
    this.ID = skill_json.ID;
    this.Name = skill_json.Name;
    this.Description = skill_json.Description;
    this.Shoutout = skill_json.Shoutout;
    this.AP_Cost = skill_json.AP_Cost;
    this.States = skill_json.States.map(s => new State(s));
  }
}