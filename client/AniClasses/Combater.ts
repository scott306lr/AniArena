import { Damage } from "./Damage";
import { Character_JSON } from "./Character"
import { Attribute_JSON, Attribute } from "./Attribute";
import { Player_JSON } from "./Player";
import { Skill } from "./Skill";


export class Combater{
    player: Player_JSON;
    character: Character_JSON;
    attribute: Attribute;
    skills: Skill[];    

    constructor(player_JSON: Player_JSON){
        this.player = JSON.parse(JSON.stringify(player_JSON));
        this.character = this.fetchCharacter(this.player.combater.character);
        this.attribute = new Attribute(this.player.combater.attribute);
        this.skills = fetchSkill(this.player.combater.character.skills);
    }

    reset(player_JSON: Player_JSON){

    }

    fetchCharacter(name: string): Character_JSON {
        let ret = { name: "name",
                    image: "image",
                    description: "description",
                    attribute: {
                        level: 1,
                        exp: 5,
                        HP: 10,
                        AP: 10,
                        APRegen: 2
                    },
                    skills: ["Skill_NormalAttack"],
                }
        return ret;
    }

    fetchSkill(skillNames: string[]): Skill[]{
        let skills:Skill[] = [];
        skillNames.forEach((skillName) => {
            skills.push(new )
        });
        return skills;
    }

    interrupt(){

    }

    dealDamage(damage: Damage, object: Combater){

    }
    
    getDamage(damage: Damage, object: Combater){

    }

    loseHP(value : number){
        let HP = this.attribute.HP.get();
        let newHP = HP - value;
        this.attribute.HP.set(newHP);
    }

    getHP(value : number){

    }

    loseAP(value : number){

    }

    getAP(value: number){
        
    }


}