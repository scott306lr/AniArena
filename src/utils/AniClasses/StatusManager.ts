import { Combater } from "./Combater";
import { Status, StatusState } from "./Status/Status";

export enum EventCode {
    BeforeGetDamage,	
    AfterGetDamage,
    BeforeDealDamage,
    AfterDealDamage,
    BeforeLoseHP,
    AfterLoseHP,
    BeforeGetHP,	
    AfterGetHP,
    BeforeGetAP,
    AfterGetAP,
    BeforeLoseAP,
    AfterLoseAP,
    BeforeCastSkill,
    AfterCastSkill,
    BeforeAddStatus,
    AfterNewRound,
    Once,
}

export class StatusManager{
    owner: Combater;
    statusList: Status[];

    constructor(owner: Combater){
        this.statusList = [];
        this.owner = owner;
    }

    /**
     * Only status class can use this function.
     * @param status 
     */
    _add(status: Status){
        this.statusList.push(status);
    }

    /**
     * Only status class can use this function. 
     * @param status which will be remove from list, remember to call status.exit() before remove
     */
    _remove(status: Status){
        this.statusList = this.statusList.filter(item => item !== status);
    }

    /**
     * check if any status care about this event, if yes, trigger it.
     * @param eventCode which event is happening.
     * @param eventTrigger who trigger this event.
     */
    trigger(eventCode: EventCode, eventTrigger: Combater | null){
        this.statusList.forEach(item => item.trigger(eventCode, eventTrigger));
    }

    get(): StatusState[] {
        let ret: StatusState[] = [];
        let pushEach = (item: Status) => ret.push(item.get());
        this.statusList.forEach(item => pushEach(item));
        return ret;
    }

}