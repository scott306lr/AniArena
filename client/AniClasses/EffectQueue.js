import { cloneDeep } from 'lodash-es';
import State from "./State";


export default class EffectQueue {
  constructor(arr = [], direct_modify = false){
    this.Queue = arr;
    this.direct_modify = direct_modify
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

  run(status_state){
    let qCopy = cloneDeep(this.Queue);
    qCopy.push(cloneDeep(status_state));

    // States are poped out sequentially and effects the other states.
    // The remaining state is the modified status_state.
    let new_Queue = [];
    while (qCopy.length > 1) {
      const first = qCopy.shift();
      qCopy = first.effect(qCopy);
      new_Queue.push(first);
    }
    if (this.direct_modify) {
      this.Queue = new_Queue;
    }

    // decrease cnt
    this.countdown();
    return qCopy[0]; // return the modified status_state
  }
}

// arr.push(structuredClone(status_state))
// status_state.Cnt = 3;
// status_state.EffectOn.push("hi");
// console.log(arr[3], status_state);
