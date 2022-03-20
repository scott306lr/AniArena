import Personal_Data from "./AniClasses/Personal_Data";
import Skill from "./AniClasses/Skill";
import Abilities from "./AniClasses/Abilities";
import Character from "./AniClasses/Character";
import Player from "./AniClasses/Player";
import Arena from "./AniClasses/Arena";

describe('Arena Test', () => {
  const abilites = new Abilities(10, 10, 10, 10);
  const P1_Char = new Character(100, 100, abilites, 100);
  const P2_Char = new Character(100, 100, abilites, 100);

  it.todo('New Game initializes HP, AP');

  it('new round regenerates AP', () => {
    const arena = new Arena(P1_Char, P2_Char);
    
    const original_AP = arena.P1.AP;
    arena.newRound();
    expect(arena.P1.AP).toBe(original_AP + arena.P1.AP_Regen);
  });

  it.todo('player holds on to a skill untill it can be executed');
  it.todo('checks whether one can attack if current AP > skill.AP');
  it.todo('if both player can attack, smaller skill.AP attacks first');
  it.todo('start game, stops once roundCount > MAX_ROUND');
  it.todo('start game, stops once HP of "one" player drops below 0');
  it.todo('start game, stops once HP of "both" player drops below 0');
  it.todo('Logs correctly per round');
  it.todo('calculates result after battle');
  it.todo('adds exp to a character after battle');
  it.todo('removes died character from a player');
})