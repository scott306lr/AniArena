import State from "../../client/AniClasses/State";
import EffectQueue from "../../client/AniClasses/EffectQueue";

describe('Arena Test', () => {
  let state1;
  let state2;
  let state3;
  let status_state;
  let arr = [];
  
  beforeEach( () => {
    state1 = new State(2, "nobleed", 3, "NORM", "DEL", {}, ["bleed"], ["anti-bleed", "buff"]);
    state2 = new State(5, "burning", 5, "NORM", "SUB", {"HP": 10}, ["status"], ["burn", "fire", "debuff"]);
    state3 = new State(4, "bleeding", 5, "NORM", "SUB", {"HP": 50}, ["status"], ["bleed", "debuff"]);
    status_state = new State(99, "status", 5, "NORM", "NONE", {"HP": 100, "AP": 100}, [], ["status"]);
    arr = [state1, state2, state3];
  });

  
  it('EffectQueue without direct_modify dont modify Queue directly.', () => {
    const q = new EffectQueue(arr, false);
    q.run(status_state);
    expect(q.Queue).toEqual(arr);
    
  });

  it('EffectQueue with direct_modify modifies Queue directly.', () => {
    const q = new EffectQueue(arr, true);
    q.run(status_state);
    expect(q.Queue).not.toEqual(arr);
  });

  it('EffectQueue.run() returns the modified status_state correctly.', () => {
    const q = new EffectQueue(arr);

    expect(q.run(status_state).args["HP"]).toEqual(100 - 10);
    expect(q.run(status_state).args["HP"]).toEqual(100 - 10);
    expect(q.run(status_state).args["HP"]).toEqual(100 - 10 - 50);
  });

})