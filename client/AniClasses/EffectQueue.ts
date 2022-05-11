import { cloneDeep } from 'lodash-es';
import {State_JSON, State} from "./State";

export class EffectQueue {
  Queue: State[];
  constructor(states: State[] = []){
    this.Queue = states;
  }

  push_states(states: State[]){
    this.Queue.push(...states);
    this.Queue.sort((a, b) => {
      return a.priority - b.priority;
    })
  }

  countdown(){
    // decrement all states' cnt by 1
    this.Queue.forEach(state => {
      state.cnt--;
    });

    // remove expired states
    this.Queue = this.Queue.filter(state => {
      return state.cnt > 0;
    });
  }

  effect(states: State[], countdown = true){
    let qCopy: State[] = cloneDeep(this.Queue);
    const state_json:State_JSON = {
      cnt: 9999,
      name: "dummy", 
      description: "dummy",
      priority: 5,
      loc: "NORM",
      action: "NONE",
      args: {},
      effectOn: [],
      labels: []
    }
    const dummyState = new State(state_json);
    qCopy.push(dummyState)
    qCopy.push(...cloneDeep(states));

    // States are popped out sequentially and effects the other states.
    // The remaining state (after dummy state) is the modified status_state.
    while (qCopy[0] !== dummyState) {
      const first = qCopy.shift();
      if (!first) break; // not happening, but ts complains if not checked

      qCopy = first.effect(qCopy);
    }
    
    // decrease cnt
    if (countdown) {
      this.countdown();
    }
    
    // return the modified input states
    qCopy.shift();
    return qCopy; 
  }
}
