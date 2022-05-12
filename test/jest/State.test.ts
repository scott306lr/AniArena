import {State_JSON, State} from "../../client/AniClasses/State";

const status_json:State_JSON = {
    cnt: 9999,
    name: "status",
    description: "",
    priority: 0,
    loc: "NORM",
    action: "NONE",
    args: {"HP": 100, "AP": 100}, 
    effectOn: [], 
    labels: ["status"]
}

const burnDamage_json:State_JSON = {
    cnt: 1,
    name: "燃燒！",
    description: "造成燃燒傷害！",
    priority: 2,
    loc: "NORM",
    action: "SUB",
    args: {"HP": 10},
    effectOn: ["status"], 
    labels: ["burn"]
}

const burnBuff_json:State_JSON = {
    cnt: 2,
    name: "燃燒之力", 
    description: "加成燃燒傷害",
    priority: 3,
    loc: "ATK",
    action: "ADD",
    args: {"HP": 3},
    effectOn: ["burn"], 
    labels: ["burn", "buff"]
}

const burnResist_json:State_JSON = {
    cnt: 1,
    name: "燃燒抗性", 
    description: "抵免燃燒傷害",
    priority: 2,
    loc: "DEF",
    action: "DIV",
    args: {"HP": 3},
    effectOn: ["burn"], 
    labels: ["buff"]
}

const iceDamage_json:State_JSON = {
    cnt: 1,
    name: "冰凍！",
    description: "造成冰凍傷害！",
    priority: 2,
    loc: "NORM",
    action: "SUB",
    args: {"HP": 10}, 
    effectOn: ["status"], 
    labels: ["ice"]
}

const doubleAttack_json:State_JSON = {
    cnt: 1,
    name: "雙發！",
    description: "物理傷害效果發動兩次！",
    priority: 3,
    loc: "ATK",
    action: "DUP",
    args: {}, 
    effectOn: ["physics"], 
    labels: ["buff"]
}

const defense_json:State_JSON = {
    cnt: 1,
    name: "防禦！",
    description: "抵免傷害！",
    priority: 3,
    loc: "DEF",
    action: "SUB",
    args: {"HP": 1}, 
    effectOn: ["physics"], 
    labels: ["physicsDef"]
}

const fragile_json:State_JSON = {
    cnt: 1,
    name: "脆弱",
    description: "受到物理傷害翻倍",
    priority: 3,
    loc: "DEF",
    action: "MUL",
    args: {"HP": 2}, 
    effectOn: ["physics"], 
    labels: ["debuff"]
}

const damage_json:State_JSON = {
    cnt: 1,
    name: "重擊",
    description: "造成物理傷害",
    priority: 3,
    loc: "NORM",
    action: "SUB",
    args: {"HP": 2}, 
    effectOn: ["status"], 
    labels: ["physics"]
}

const invincible_json:State_JSON = {
    cnt: 1,
    name: "無敵",
    description: "免疫下一次物理傷害",
    priority: 3,
    loc: "DEF",
    action: "DEL",
    args: {}, 
    effectOn: ["physics"], 
    labels: ["buff"]
}

describe('State Test', () => {

    it('ID1: 燃燒傷害可以被燃燒加成效果增加傷害', () => {
        let burnDamage = new State(burnDamage_json)
        let burnBuff = new State(burnBuff_json)
        let after  = burnBuff.effect([burnDamage]);
        expect(after[0].args["HP"]).toEqual(13);
    });

    it('ID2: 防禦技能可以減少傷害', () => {
        let damage = new State(damage_json)
        let defense = new State(defense_json)
        let after  = defense.effect([damage]);
        expect(after[0].args["HP"]).toEqual(1);
    });

    it('ID3: 易傷狀態受到的傷害翻倍', () => {
        let fragile = new State(fragile_json)
        let damage = new State(damage_json)
        let ans = damage.args["HP"]*fragile.args["HP"]
        let after  = fragile.effect([damage]);
        expect(after[0].args["HP"]).toEqual(ans);
    });
  
    it('ID4: 燃燒抗性可以減免燃燒傷害', () => {
        let burnResist = new State(burnResist_json)
        let testState = new State(burnBuff_json)
        let ans = Math.round(testState.args["HP"]/burnResist.args["HP"])
        let after  = burnResist.effect([testState]);
        expect(after[0].args["HP"]).toEqual(ans);
    });

    it('ID5: 無敵效果可以直接刪除效果', () => {
        let testState = new State(damage_json)
        let invincible = new State(invincible_json)
        let effectState = new State(invincible)
        let after  = effectState.effect([testState]);
        expect(after[0]).toEqual(undefined);
    });

    it('ID6: 雙發可以讓某效果作用兩次', () => {
        let testState = new State(damage_json)
        let effectState = new State(doubleAttack_json)
        let after  = effectState.effect([testState]);
        expect(after.length).toEqual(2);
        expect(after[1]).toEqual(after[0]);
    });

    it('ID7: 冰凍傷害不可以被燃燒加成效果增加傷害', () => {
        let oriState = new State(iceDamage_json);
        let testState = new State(iceDamage_json);
        let effectState = new State(burnBuff_json);
        let after  = effectState.effect([testState]);
        expect(after[0].args["HP"]).toEqual(oriState.args["HP"]);
    });
    
  

})