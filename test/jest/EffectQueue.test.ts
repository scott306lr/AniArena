import {State_JSON, State} from "../../client/AniClasses/State";
import {EffectQueue} from "../../client/AniClasses/EffectQueue";

describe('Arena Test', () => {
  let state1: State;
  let state2: State;
  let state3: State;
  let status_state: State;
  let arr: State[] = [];

  beforeEach( () => {
    const state1_json:State_JSON = {
      cnt: 2,
      name: "nobleed",
      description: "immune to bleeding!",
      priority: 3,
      loc: "NORM",
      action: "DEL",
      args: {},
      effectOn: ["bleed"], 
      labels: ["anti-bleed", "buff"]
    }

    const state2_json:State_JSON = {
      cnt: 5,
      name: "burning", 
      description: "$name burning!",
      priority: 5,
      loc: "NORM",
      action: "SUB",
      args: {"HP": 10},
      effectOn: ["status"], 
      labels: ["burn", "fire", "debuff"]
    }

    const state3_json:State_JSON = {
      cnt: 4,
      name: "bleeding",
      description: "$name burning!",
      priority: 5,
      loc: "NORM",
      action: "SUB",
      args: {"HP": 50}, 
      effectOn: ["status"], 
      labels: ["bleed", "debuff"]
    }

    const status_json:State_JSON = {
      cnt: 9999,
      name: "status",
      description: "$name burning!",
      priority: 5,
      loc: "NORM",
      action: "NONE",
      args: {"HP": 100, "AP": 100}, 
      effectOn: [], 
      labels: ["status"]
    }
    state1 = new State(state1_json);
    state2 = new State(state2_json);
    state3 = new State(state3_json);
    status_state = new State(status_json);
    arr = [state1, state2, state3];
  });

  
  it('EffectQueue without direct_modify dont modify Queue directly.', () => {
    const q = new EffectQueue(arr);
    q.effect([status_state]);
    expect(q.Queue).toEqual(arr);
    
  });

  it('EffectQueue.effect() returns the modified status_state correctly.', () => {
    const q = new EffectQueue(arr);

    expect(q.effect([status_state])[0].args["HP"]).toEqual(100 - 10);
    expect(q.effect([status_state])[0].args["HP"]).toEqual(100 - 10);
    expect(q.effect([status_state])[0].args["HP"]).toEqual(100 - 10 - 50);
  });

  it('EffectQueue.effect() returns the modified states correctly.', () => {
    const q = new EffectQueue(arr);

    const new_arr = [state1, state2];
    const out_arr = q.effect(arr, false);
    expect(out_arr).toEqual(new_arr);
  });

  it.todo('EffectQueue.effect() logs correctly.')

})