import { Attribute_JSON } from "./Attribute";

export type Character_JSON = {
    name: string;
    image: string;
    description: string;
    attribute: Attribute_JSON;
    skills: string[];
}
