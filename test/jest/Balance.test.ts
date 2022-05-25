import {Personal_Data} from "../../client/AniClasses/Personal_Data";
import {Skill} from "../../client/AniClasses/Skill";
import {Abilities} from "../../client/AniClasses/Abilities";
import {Character} from "../../client/AniClasses/Character";
import {Player} from "../../client/AniClasses/Player";
import {Arena} from "../../client/AniClasses/Arena";



describe('Balance Test', () => {

  it('惠惠對上木頭人', () => {
        let megumin = new Character(101, 1);
        megumin.loadData(megumin.fetchMegumin(101, 1));
        let woodTarget = new Character(102, 2);
        woodTarget.loadData(woodTarget.fetchTestTarget(102, 2));
        let arena = new Arena(megumin, woodTarget);
        arena.newGame();
        arena.startGame();
        console.log(arena.log);
  });

  it('黑色劍士對上木頭人', () => {
    let kirito = new Character(101, 1);
    kirito.loadData(kirito.fetchKirito(101, 1));
    let woodTarget = new Character(102, 2);
    woodTarget.loadData(woodTarget.fetchTestTarget(102, 2));
    let arena = new Arena(kirito, woodTarget);
    arena.newGame();
    arena.startGame();
    console.log(arena.log);
});

  it('黑色劍士對上惠惠', () => {
    let kirito = new Character(101, 1);
    kirito.loadData(kirito.fetchKirito(101, 1));
    let megumin = new Character(102, 2);
    megumin.loadData(megumin.fetchMegumin(102, 2));
    let arena = new Arena(kirito, megumin);
    arena.newGame();
    arena.startGame();
    console.log(arena.log);
});

  it('黑色劍士對上赤色殺人魔', () => {
    let kirito = new Character(101, 1);
    kirito.loadData(kirito.fetchKirito(101, 1));
    let reimu = new Character(102, 2);
    reimu.loadData(reimu.fetchReimu(102, 2));
    let arena = new Arena(kirito, reimu);
    arena.newGame();
    arena.startGame();
    console.log(arena.log);
});

  it('古神祭司對上赤色殺人魔', () => {
    let inanis = new Character(101, 1);
    inanis.loadData(inanis.fetchInanis(101, 1));
    let reimu = new Character(102, 2);
    reimu.loadData(reimu.fetchReimu(102, 2));
    let arena = new Arena(inanis, reimu);
    arena.newGame();
    arena.startGame();
    console.log(arena.log);
});

  it('古神祭司對上黑色劍士', () => {
    let inanis = new Character(101, 1);
    inanis.loadData(inanis.fetchInanis(101, 1));
    let kirito = new Character(102, 2);
    kirito.loadData(kirito.fetchKirito(102, 2));
    let arena = new Arena(inanis, kirito);
    arena.newGame();
    arena.startGame();
    console.log(arena.log);
});

  it('古神祭司對上惠惠', () => {
    let inanis = new Character(101, 1);
    inanis.loadData(inanis.fetchInanis(101, 1));
    let megumin = new Character(102, 2);
    megumin.loadData(megumin.fetchMegumin(102, 2));
    let arena = new Arena(inanis, megumin);
    arena.newGame();
    arena.startGame();
    console.log(arena.log);
});

})