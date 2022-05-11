import { cloneDeep } from 'lodash-es';

export default class State {
  constructor(cnt, name, priority, loc, action, args, effectOn, label){
    this.cnt = cnt;
    this.name = name;
    this.priority = priority;
    this.loc = loc;
    this.action = action;
    this.args = args;
    this.effectOn = effectOn;
    this.label = label;
  }

  effect(arr){
    let ret = [];
    for(let i = 0; i < arr.length; i++){
      let state = arr[i];

      // any of the states' labels are included in effectOn
      const found = this.effectOn.some( r => state.label.includes(r) );

      // if not found, skip, don't modify state.
      if (!found){
        ret.push(state);
        continue;
      }
      //console.log("found", state.name);
      
      // modify state
      switch (this.action) {
        case 'ADD':
          for (const key in this.args) {
            state.args[key] += this.args[key];
          }
          ret.push(state);
          break;
  
        case 'SUB':
          for (const key in this.args) {
            state.args[key] -= this.args[key];
          }
          ret.push(state);
          break;
  
        case 'MUL':
          for (const key in this.args) {
            state.args[key] *= this.args[key];
          }
          ret.push(state);
          break;
  
        case 'DIV':
          for (const key in this.args) {
            state.args[key] /= this.args[key];
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
