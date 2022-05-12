import {Abilities} from "../../client/AniClasses/Abilities";
import {Character} from "../../client/AniClasses/Character";
import {Player} from "../../client/AniClasses/Player" 

describe('Player', () => {
    let abi;
    let char;
    let team;
    let player;

    beforeEach( () => {
        char = new Character(101, 8787);
        char.fetchData();
        team = 'A';
        player = new Player(char, team);
    })
    
    it('constructor', () => {
        expect(player.Character).toBe(char);
    })

    it('chooseSkill', () => {
        player.chooseSkill();
        expect(player.nextSkill).toBeDefined();
    })

    // it('attack', () => {
    //     let attacker = player;
    //     attacker.Character.Owner_ID = 'attackerBot';
    //     let defChar = new Character('target',1,abi,15);
    //     let defenser = new Player(defChar, 'B');
    //     attacker.chooseSkill();
    //     // it should use mock skill here but later
    //     let log = attacker.attack(defenser);
    //     expect(log).toBeDefined();
    // })

})