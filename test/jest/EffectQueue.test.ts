import State from "../../client/AniClasses/State";
import EffectQueue from "../../client/AniClasses/EffectQueue";

describe('Arena Test', () => {
  let state1;
  let state2;
  let state3;
  let status_state;
  let arr = [];

  beforeEach( () => {
    state1 = new State(
                  2, 
                  "nobleed", 
                  "immune to bleeding!", 
                  3, 
                  "NORM", 
                  "DEL", 
                  {}, 
                  ["bleed"], 
                  ["anti-bleed", "buff"]
                );
    state2 = new State(
                  5, 
                  "burning", 
                  "$name burning!", 
                  5, 
                  "NORM", 
                  "SUB", 
                  {"HP": 10}, 
                  ["status"], 
                  ["burn", "fire", "debuff"]
                );
    state3 = new State(
                  4, 
                  "bleeding", 
                  "$name burning!", 
                  5, 
                  "NORM", 
                  "SUB", 
                  {"HP": 50}, 
                  ["status"], 
                  ["bleed", "debuff"]
                );
    status_state = new State(
                  9999, 
                  "status", 
                  5, 
                  "NORM", 
                  "NONE", 
                  "DEL", 
                  {"HP": 100, "AP": 100}, 
                  [], 
                  ["status"] 
                );
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