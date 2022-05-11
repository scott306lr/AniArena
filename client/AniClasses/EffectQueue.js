import { cloneDeep } from 'lodash-es';
import State from "./State";

export default class EffectQueue {
  constructor(arr = []){
    this.Queue = arr;
  }

  push_states(states){
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

  effect(states, countdown = true){
    let qCopy = cloneDeep(this.Queue);
    const dummyState = new State(9999, "dummy", 5, "NORM", "NONE", {}, [], []);
    qCopy.push(dummyState)
    qCopy.push(...cloneDeep(states));

    // States are popped out sequentially and effects the other states.
    // The remaining state (after dummy state) is the modified status_state.
    while (qCopy[0] !== dummyState) {
      const first = qCopy.shift();
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
