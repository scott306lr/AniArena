import {Personal_Data} from "../../client/AniClasses/Personal_Data";
import {Skill} from "../../client/AniClasses/Skill";
import {Abilities} from "../../client/AniClasses/Abilities";
import {Character} from "../../client/AniClasses/Character";
import {Player} from "../../client/AniClasses/Player";
import {Arena} from "../../client/AniClasses/Arena";

describe('Arena Test', () => {
  let abilites;
  let P1_Char;
  let P2_Char;
  let arena;

  beforeEach( () => {
    
    abilites = new Abilities({
      HP_Init: 100,
      AP_Regen: 1,
      AP_Init: 3,
      Exp: 10
    });

    P1_Char = new Character(101, 8787);
    P2_Char = new Character(102, 8111);  
    arena = new Arena(P1_Char, P2_Char);
  });

  it.todo('New Game initializes HP, AP');

  it('new round regenerates AP', () => {
    const original_AP = arena.P1.AP;
    arena.newRound();
    expect(arena.P1.AP).toBe(original_AP + arena.P1.AP_Regen);
  });

  it('getLog', () => {
    expect(arena.getLog()).toBeDefined();
  });

  it('newGame: initialize game value', () => {
    let log = arena.newGame();
    expect(arena.roundCount).toBe(1);
    expect(arena.P1.AP).toBe(arena.P1.Character.Abilities.AP_Init);
    expect(arena.P1.HP).toBe(arena.P1.Character.Abilities.HP_Init);
    expect(arena.P2.AP).toBe(arena.P2.Character.Abilities.AP_Init);
    expect(arena.P2.HP).toBe(arena.P1.Character.Abilities.HP_Init);
  });

  it('logRound', () => {
    arena.newGame();
    arena.logRound("Nothing happended.");
    expect(arena.getLog().length).toBe(1);
    // console.log(arena.getLog());
  });
  
  // it.todo('player holds on to a skill untill it can be executed');
  // it.todo('checks whether one can attack if current AP > skill.AP');
  // it.todo('if both player can attack, smaller skill.AP attacks first');
  // it.todo('start game, stops once roundCount > MAX_ROUND');
  // it.todo('start game, stops once HP of "one" player drops below 0');
  // it.todo('start game, stops once HP of "both" player drops below 0');
  // it.todo('Logs correctly per round');
  
  it('startGame', () => {
    arena.newGame();
    arena.startGame();
    console.log(arena.getLog());
  });
  
  it.todo('calculates result after battle');
  it.todo('adds exp to a character after battle');
  it.todo('removes died character from a player');
})