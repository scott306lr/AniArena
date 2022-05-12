export type State_JSON = {
  cnt: number; 
  name: string;
  description: string;
  priority: number;
  loc: string;
  action: string;
  args: object | any;
  effectOn: string[];
  labels: string[];
}

export class State {
  cnt: number; 
  name: string;
  description: string;
  priority: number;
  loc: string;
  action: string;
  args: object | any;
  effectOn: string[];
  labels: string[];

  constructor(state_json: State_JSON){
    this.cnt = state_json.cnt;
    this.name = state_json.name;
    this.description = state_json.description;
    this.priority = state_json.priority;
    this.loc = state_json.loc;
    this.action = state_json.action;
    this.args = state_json.args;
    this.effectOn = state_json.effectOn;
    this.labels = state_json.labels;
  }

  effect(states: State[]){
    let ret = [];
    for(let i = 0; i < states.length; i++){
      let state = states[i];

      // any of the states' labels are included in effectOn
      const found = this.effectOn.some( r => state.labels.includes(r) );

      // if not found, skip, don't modify state.
      if (!found){
        ret.push(state);
        continue;
      }
      // console.log("found", state.name);
      
      // modify state
      switch (this.action) {
        case 'ADD':
          for (const key in this.args) {
            if(key in state.args){
              state.args[key] += this.args[key];
            }
          }
          ret.push(state);
          break;
  
        case 'SUB':
          for (const key in this.args) {
            if (key in state.args){
              state.args[key] = Math.max(0, state.args[key] - this.args[key]);
            }
          }
          ret.push(state);
          break;
  
        case 'MUL':
          for (const key in this.args) {
            if (key in state.args){
              state.args[key] *= this.args[key];
            }
          }
          ret.push(state);
          break;
  
        case 'DIV':
          for (const key in this.args) {
            if (key in state.args){
              state.args[key] /= this.args[key];
              Math.round(state.args[key])
            }
          }
          ret.push(state);
          break;
  
        case 'DEL':
          break;
  
        case 'DUP':
          ret.push(state);
          ret.push(state);
          break;
  
        default:
          ret.push(state);
          break;
      }
    }
    return ret;
  }
}