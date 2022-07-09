import { Combater } from "./Combater";
import { Status } from "./Status/Status";

export enum EventCode {
    BeforeGetDamage,	
    AfterGetDamage,
    BeforeDealDamage,
    AfterDealDamage,
    BeforeLoseHP,
    AfterLoseHP,
    BeforeHealHP,	
    AfterHealHP,
    BeforeActivateSkill,
    AfterActivateSkill,
    BeforeAddStatus,
    AfterNewRound,
}

export class EventHandler{
    owner: Combater;
    events: Status[];

    constructor(owner: Combater){
        this.events = [];
        this.owner = owner;
    }

    /**
     * Only status class can use this function.
     * @param status 
     */
    _add(status: Status){
        this.events.push(status);
    }

    /**
     * Only status class can use this function. 
     * @param status which will be remove from list, remember to call status.exit() before remove
     */
    _remove(status: Status){
        this.events = this.events.filter(item => item !== status);
    }

    /**
     * check if any status care about this event, if yes, trigger it.
     * @param eventCode which event is happening.
     * @param eventTrigger who trigger this event.
     */
    trigger(eventCode: EventCode, eventTrigger: Combater){
        this.events.forEach(item => item.trigger(eventCode, eventTrigger));
    }

}