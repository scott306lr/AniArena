import { AttributeState } from './Attribute';
import { Combater } from './Combater';
import { Character_JSON, Player_JSON } from './Types';
import { StatusState } from './Status/Status';

export class Arena {
  player1: Player_JSON;
  player2: Player_JSON;
  combater1: Combater;
  combater2: Combater;
  logger: Logger;
  round: number;
  maxRound: number;

  constructor(player1: Player_JSON, player2: Player_JSON, maxRound?: number) {
    this.player1 = JSON.parse(JSON.stringify(player1));
    this.player2 = JSON.parse(JSON.stringify(player2));

    this.combater1 = new Combater(this.player1, this);
    this.combater2 = new Combater(this.player2, this);
    this.logger = new Logger(this, this.combater1, this.combater2);

    this.round = 0;
    this.maxRound = maxRound === undefined ? 20 : maxRound;
  }

  reset(player1?: Player_JSON, player2?: Player_JSON) {
    if (player1 !== undefined) {
      this.player1 = JSON.parse(JSON.stringify(player1));
    }
    if (player2 !== undefined) {
      this.player2 = JSON.parse(JSON.stringify(player2));
    }

    this.combater1 = new Combater(this.player1, this);
    this.combater2 = new Combater(this.player2, this);
    this.logger = new Logger(this, this.combater1, this.combater2);
    this.round = 0;
  }

  start(): CombatLog {
    let isEnd = false;
    while (this.round < this.maxRound && !isEnd) {
      this.newRound(true);

      while (this.combater1.isReady() || this.combater2.isReady()) {
        // Combater takes action
        if (this.combater1.isReady() && this.combater2.isReady()) {
          const c1 = this.combater1.getPriority();
          const c2 = this.combater2.getPriority();
          const threshold = c1 / (c1 + c2);
          if(Math.random() >= threshold){
            this.combater1.castSkill(this.combater2);
          }
          else{
            this.combater2.castSkill(this.combater1);
          }
        } else if (this.combater1.isReady()) {
          this.combater1.castSkill(this.combater2);
        } else if (this.combater2.isReady()) {
          this.combater2.castSkill(this.combater1);
        }

        if (this.endCondition()) {
          isEnd = true;
          break;
        }
      }
    }
    return this.getLog();
  }

  private endCondition(): boolean {
    const combater1_state = this.combater1.getCombaterState();
    const combater2_state = this.combater2.getCombaterState();

    const combater1_HP = combater1_state.attr.HP;
    const combater2_HP = combater2_state.attr.HP;

    if (combater1_HP <= 0 && combater2_HP <= 0) {
      this.logger.log(undefined, LogType.die, `${combater1_state.name}和${combater2_state.name}同時倒下了！`);
      return true;
    } else if (combater1_HP <= 0) {
      this.logger.log(this.combater1, LogType.die, `${combater1_state.name}倒下了！`);
      this.logger.log(this.combater2, LogType.win, `${combater2_state.name}獲得了勝利！`);
      this.logger.setWinner(this.combater2);
      return true;
    } else if (combater2_HP <= 0) {
      this.logger.log(this.combater2, LogType.die, `${combater2_state.name}倒下了！`);
      this.logger.log(this.combater1, LogType.win, `${combater1_state.name}獲得了勝利！`);
      this.logger.setWinner(this.combater1);
      return true;
    } else if (this.round > this.maxRound) {
      this.logger.log(
        undefined,
        LogType.else,
        `${combater1_state.name}和${combater2_state.name}無法突破系統回合限制，戰鬥結束`
      );
      return true;
    }
    return false;
  }

  private newRound(addRound: boolean) {
    this.round += Number(addRound);
    this.combater1.newRound();
    this.combater2.newRound();
  }

  getLog(): CombatLog {
    return this.logger.get();
  }
}

export type CombaterState = {
  id: string;
  name: string;
  character: Character_JSON;
  attr: AttributeState;
  status: StatusState[];
};

export enum LogType {
  attack = 'attack',
  action = 'action',
  hurt = 'hurt',
  effected = 'effected',
  die = 'die',
  win = 'win',
  else = 'else',
}

export type ActionLog = {
  logger: CombaterState | undefined;
  log: string;
  type: LogType;
};

export type CombatLog = {
  combater1: CombaterState;
  combater2: CombaterState;
  winner?: CombaterState;
  logs: ActionLog[];
};

export class Logger {
  combatLog: CombatLog;
  arena: Arena;

  constructor(arena: Arena, combater1: Combater, combater2: Combater) {
    this.arena = arena;
    this.combatLog = {
      combater1: combater1.getCombaterState(),
      combater2: combater2.getCombaterState(),
      winner: undefined,
      logs: [],
    };
  }

  log(logger: Combater | undefined, type: LogType, message: string) {
    let state = undefined;
    if (logger !== undefined) {
      state = logger.getCombaterState();
    }
    const actionLog: ActionLog = {
      logger: state,
      log: message,
      type: type,
    };
    this.combatLog.logs.push(actionLog);
  }

  setWinner(winner: Combater | undefined) {
    if (winner === undefined) {
      this.combatLog.winner = undefined;
    } else {
      this.combatLog.winner = winner.getCombaterState();
    }
  }

  /**
   * get combat log object
   * @returns Object, pass by copy
   */
  get(): CombatLog {
    return JSON.parse(JSON.stringify(this.combatLog));
  }
}
