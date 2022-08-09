export type Player_JSON = {
    email: string;
    nickname: string;
    description: string;
    unlock_characters: string[];
    combater: {
        character: string;
        attribute: {
            level: number;
            exp: number;
            HP: number;
            AP: number;
            APRegen: number;
        }
        inherent_skills: string[];
    }
}